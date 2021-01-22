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
      // const tokenParse: TokenParseProps = ctx.app.jwt.verify(
      //   token,
      //   ctx.app.config.jwt.secret
      // );
      // const userInfoStr = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);

      // const [id, username] = userInfoStr.split('-');

      // const tokenParse: TokenParseProps = {
      //   id: Number(id),
      //   username,
      // };

      const tokenParse = ctx.decodeToken(token);

      console.log('检查token-tokenParse: ', tokenParse);

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
