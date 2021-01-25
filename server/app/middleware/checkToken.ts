import { Context } from 'egg';

// 这里是你自定义的中间件
export default function checkToken(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const url = ctx.request.url.split('?')[0];
    const notNeedTokenRouter: string[] =
      ctx.app.config.checkToken.notNeedTokenRouter;

    // 无需token
    if (notNeedTokenRouter.includes(url)) {
      await next();
      return;
    }

    const token = ctx.request.header.token;

    if (!token) {
      ctx.body = {
        status: 1001,
        message: '用户未登录',
      };
      return;
    }

    try {
      const tokenParse = ctx.decodeToken();

      const {username} = tokenParse;

      const currentRedisToken = await ctx.app.redis.get(`user_${username}_token`);
      
      if (token !== currentRedisToken) {
        ctx.body = {
          status: 1002,
          message: 'token已失效',
        };
        return;
      }

      ctx.state.tokenParse = tokenParse;

      await next();
    } catch (err) {
      ctx.body = {
        status: 1002,
        message: 'token已失效',
      };
    }
  };
}
