import BaseController from './BaseController';

import {
  RegisterParams,
  LoginParams
} from '../types/admin';
const md5 = require('md5');

class AdminController extends BaseController {
  async register() {
    const { ctx, app } = this;
    const params: RegisterParams = ctx.request.body;
    
    const user = await ctx.service.user.getUser({username: params.username});

    console.log('注册-user: ', user);
    
    
    if (user) {
      this.error('用户已存在');
      return;
    }

    const insertRes = await ctx.service.user.insertUser(params);
    
    if (!insertRes) {
      this.error('注册失败');
      return;
    }

    const {id, username} = insertRes;

    const token = ctx.encodeToken({id, username});

    console.log('注册-token: ', token);
    

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpiresMS
    });

    app.redis.set(`user_${username}_token`, token, 'EX', app.config.tokenExpiresSeconds);

    this.success({token});
  }

  async login () {
    const {ctx, app} = this;

    const params: LoginParams = ctx.request.body;
    const {username, password} = params;

    const user = await ctx.service.user.getUser({username});

    if (!user) {
      this.error('未找到该用户');
      return
    }
    const secret = app.config.secret;
    const md5Pwd = md5(`${password}${secret}`);

    if (md5Pwd !== user.password) {
      this.error('账号或密码错误');
      return
    }
    
    const token = ctx.encodeToken({
      id: user.id,
      username: user.username
    })

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpiresMS
    });

    app.redis.set(`user_${user.username}_token`, token, 'EX', app.config.tokenExpiresSeconds);
    
    this.success({token});
  }

  async detail () {
    const { ctx } = this;

    const encodeToken = ctx.decodeToken();
    const tokenParse = ctx.state.tokenParse;

    this.success({
      encodeToken,
      tokenParse
    })
  }

  async testSet () {
    const {ctx, app} = this;

    const {username} = ctx.request.body;

    app.redis.set

    const insertRes = await app.redis.hset('user_logins', username, `${username}-token`);

    console.log('redis插入返回: ', insertRes);

    ctx.body = {
      status: 200,
      message: 'success',
      data: {
        insertRes
      }
    }
    
  }

  async testGet () {
    const {ctx, app} = this;

    const {username} = ctx.request.body;

    const userLogins = await app.redis.hget('user_logins', username);

    console.log('userLogins: ', userLogins);
    

    ctx.body = {
      status: 200,
      message: '成功',
      data: {
        userLogins
      }
    }
  }

  async testDel () {
    const {ctx, app} = this;

    const {username} = ctx.request.body;

    const userLogins = await app.redis.hdel('user_logins', username);

    console.log('userLogins: ', userLogins);
    

    ctx.body = {
      status: 200,
      message: '成功',
      data: {
        userLogins
      }
    }
  }
}

export default AdminController;
