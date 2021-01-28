import BaseController from './BaseController';

class TestController extends BaseController {
  async detail () {
    this.success({
      msg: '成功'
    })
  }

  async testValidate () {
    /**
     * {
     *    username: string;
     *    password: string;
     *    confirmPassword: string;
     * }
     */
    const {ctx, app} = this;

    const rule = app.rules.admin.test;

     const validateResult  = await ctx.validate(rule, ctx.request.body);

     if (!validateResult ) {
       return;
     }
     

     this.success();
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

export default TestController;
