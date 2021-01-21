import { Controller } from 'egg';

import {
  RegisterParams,
  LoginParams,
  // DetailParams
} from '../types/admin';
const md5 = require('md5');


class AdminController extends Controller {
  async register() {
    const { ctx, app } = this;
    const params: RegisterParams = ctx.request.body;

    // const {username} = params;
    
    const user = await ctx.service.user.getUser({username: params.username});

    console.log('user: ', user);
    
    if (user) {
      ctx.body = {
        status: 500,
        message: '用户已存在'
      }
      return;
    }

    const insertRes = await ctx.service.user.insertUser(params);
    console.log('insertRes: ', insertRes);
    
    if (!insertRes) {
      ctx.body = {
        status: 500,
        message: '注册失败'
      }
      return;
    }

    const {id, username} = insertRes;

    const token = app.jwt.sign({
      id,
      username
    }, app.config.jwt.secret);

    console.log('token: ', token);
    
    
    ctx.body = {
      status: 200,
      message: 'success'
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
    }, app.config.jwt.secret);

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

    // const reqToken: string = ctx.request.headers.token;
    
    // const enCodeToken = app.jwt.verify(reqToken, app.config.jwt.secret);

    const enCodeToken = ctx.helper.tokenParse();
    console.log('enCodeToken: ', enCodeToken);
    

    const {id} = enCodeToken;
    
    const user = await ctx.service.user.getUser({id});
    
    ctx.body = user;
  }
}

export default AdminController;
