import { Context } from 'egg';
import { TokenParseProps } from '../types/admin';

// 这里是你自定义的中间件
export default function checkToken(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const url = ctx.request.url.split('?')[0];
    const notNeedTokenRouter: string[] =
      ctx.app.config.checkToken.notNeedTokenRouter;
    console.log('notNeedTokenRouter: ', notNeedTokenRouter);

    if (notNeedTokenRouter.includes(url)) {
      await next();
      return;
    }

    const token = ctx.request.header.token;
    console.log('token: ', token);

    if (!token) {
      ctx.body = {
        status: 1001,
        message: '用户未登录',
      };
      return;
    }

    try {
      const tokenParse: TokenParseProps = ctx.app.jwt.verify(
        token,
        ctx.app.config.jwt.secret
      );
      console.log('👉 tokenParse: ', tokenParse);

      ctx.state.tokenParse = tokenParse;

      await next();
    } catch (err) {
      ctx.body = {
        status: 1002,
        message: 'token已失效'
      }
    }
  };
}
