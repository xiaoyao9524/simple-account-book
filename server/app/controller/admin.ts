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
    
    const user = await ctx.service.user.getUser({username: params.username});

    console.log('注册-user: ', user);
    
    
    if (user) {
      ctx.body = {
        status: 500,
        message: '用户已存在'
      }
      return;
    }

    const insertRes = await ctx.service.user.insertUser(params);

    console.log('注册-insertRes: ', insertRes);
    
    if (!insertRes) {
      ctx.body = {
        status: 500,
        message: '注册失败'
      }
      return;
    }

    const {id, username} = insertRes;

    // const token = app.jwt.sign(`${id}-$${username}`, app.config.jwt.secret, {
    //   expiresIn: app.config.tokenExpiresSecond
    // });

    const token = ctx.encodeToken({id, username});

    console.log('注册-token: ', token);
    

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpiresMS
    });

    // app.redis
    
    ctx.body = {
      status: 200,
      message: 'success',
      data: {
        token
      }
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
    // {
    //   id: user.id,
    //   username: user.username
    // }

    // const token = app.jwt.sign(`${user.id}-${user.username}`, app.config.jwt.secret, {
    //   expiresIn: app.config.tokenExpiresSecond
    // });
    const token = ctx.encodeToken({
      id: user.id,
      username: user.username
    })

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpiresMS
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

    // const enCodeToken = ctx.helper.tokenParse();
    // console.log('enCodeToken: ', enCodeToken);

    // console.log('ctx.state.tokenParse: ', ctx.state.tokenParse)
    const encodeToken = ctx.decodeToken();
    const tokenParse = ctx.state.tokenParse;

    // const {id} = ctx.state.tokenParse;
    
    // const user = await ctx.service.user.getUser({id});
    
    ctx.body = {
      status: 200,
      message: 'success',
      data: {
        encodeToken,
        tokenParse
      }
    };
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
