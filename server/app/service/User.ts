import { Service } from 'egg';

import { SignupRequestProps } from '../types/admin';

const md5 = require('md5');

interface queryUserParams {
  id?: number;
  username?: string;
}

interface InsertUserProps extends SignupRequestProps {
  expenditureList: string;
  incomeList: string;
}

interface UpdateCategoryParams {
  expenditureList: number[];
  incomeList: number[];
}

class UserService extends Service {
  public async getUser(params: queryUserParams) {
    const {ctx} = this;

    const {id, username} = params;

    const where: queryUserParams = {};

    if (id !== undefined) {
      where.id = id;
    } else if (username !== undefined) {
      where.username = username;
    }

    try {
      const result = await ctx.model.User.findOne({
        where
      })

      return result;
    } catch (err) {
      console.log('err: ', err);
      return null;
    }
  }

  async insertUser (userInfo: InsertUserProps) {
    const { ctx, app } = this;

    const { expenditureList, incomeList } = userInfo;

    try {

      const insertData = {
        ...userInfo,
        password: md5(`${userInfo.password}${app.config.secret}`),
        expenditureList,
        incomeList
      };
      
      const result = await ctx.model.User.create(insertData);

      return result;
    } catch (err) {
      console.log('err: ', err);
      return null;
    }
  }

  // 更新某user详情类别列表
  async updateCategoryList (id: number, newCategory: UpdateCategoryParams) {
    const { ctx } = this;
    const { expenditureList, incomeList } = newCategory;
    
    try {
      const result = await ctx.model.User.update({
        expenditureList: expenditureList.join(','),
        incomeList: incomeList.join(',')
      }, {
        where: {
          id
        }
      })

      return result;
    } catch (err) {
      console.log('err: ', err);
      return null;
    }
  }
}

export default UserService;
