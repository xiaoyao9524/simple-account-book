import { Service } from 'egg';
import {
  SignupRequestProps
} from '../types/admin';
const md5 = require('md5');

interface queryUserParams {
  id?: number;
  username?: string;
}

interface InsertUserProps extends SignupRequestProps {
  categoryList: string;
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
    const {ctx, app} = this;

    try {

      const insertData = {
        ...userInfo,
        password: md5(`${userInfo.password}${app.config.secret}`)
      };
      
      const result = await ctx.model.User.create(insertData);

      return result;
    } catch (err) {
      console.log('err: ', err);
      return null;
    }
  }
}

export default UserService;
