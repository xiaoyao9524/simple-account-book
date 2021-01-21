import { Service } from 'egg';
import {
  RegisterParams
} from '../types/admin';
const md5 = require('md5');

interface queryUserParams {
  id?: number;
  username?: string;
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
    }
  }

  async insertUser (userInfo: RegisterParams) {
    const {ctx, app} = this;

    try {
      const result = await ctx.model.User.create({
        ...userInfo,
        password: md5(`${userInfo.password}${app.config.secret}`)
      });

      return result;
    } catch (err) {
      console.log('err: ', err);
      
    }
  }
}

export default UserService;
