import { Controller } from 'egg';

import {
  RegisterParams,
  LoginParams,
  DetailParams
} from '../types/admin';
const md5 = require('md5');


class AdminController extends Controller {
  public async register() {
    const { ctx } = this;
    const params: RegisterParams = ctx.request.body;

    console.log('params: ', params);
    const {username} = params;
    
    const user = await ctx.service.user.getUser({username});

    console.log('user: ', user);
    
    if (user) {
      ctx.body = {
        status: 500,
        message: '用户已存在'
      }
      return;
    }
    
    ctx.body = {
      ...params
    };
  }

  async login () {
    const {ctx, app} = this;

    const params: LoginParams = ctx.request.body;
    const {username, password} = params;

    const user = await ctx.service.user.getUser({username});

    if (!user) {
      ctx.body = {
        status: 500,
        message: '未找到该用户'
      }
      return
    }
    const secret = app.config.secret;
    const md5Pwd = md5(`${password}${secret}`);

    if (md5Pwd !== user.password) {
      ctx.body = {
        status: 500,
        message: '账号或密码错误'
      }
      return
    }

    const token = app.jwt.sign({
      id: user.id,
      username: user.username
    });

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpire
    });
    
    ctx.body = {
      status: 200,
      data: {
        token
      }
    }
  }

  async detail () {
    const { ctx } = this;
    const params: DetailParams = ctx.request.body;

    const {id} = params;

    console.log('params: ', params);
    
    const user = await ctx.service.user.getUser({id});
    
    ctx.body = user;
  }
}

export default AdminController;
