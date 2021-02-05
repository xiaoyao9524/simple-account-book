import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  // 60 * 60
  const secret = '58rrot234gg'; // token和md5加密字符串
  const tokenExpireHour = 1; // token过期时间（小时）
  const tokenExpiresStr = `${tokenExpireHour}h`; // token过期时间（字符串-小时）
  const tokenExpiresSeconds = 60 * 60 * tokenExpireHour; // token过期时间（秒）
  const tokenExpiresMS = tokenExpiresSeconds * 1000; // token过期时间（毫秒）
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611128577302_2474';

  // add your egg config in here
  config.middleware = ['checkToken'];

  config.jwt = {
    secret, //自定义 token 的加密条件字符串
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['http://localhost:3000'], //允许访问接口的白名单
  };

  

  config.validatePlus = {
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.status = 500;
        ctx.body = {
          status: 500,
          message: errors.map(i => i.message).join('、')
        };
      }
    }
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    secret,
    // tokenExpire: 60 * 60 * 24 * 1000, // token过期时间
    tokenExpireHour,
    tokenExpiresSeconds,
    tokenExpiresMS,
    tokenExpiresStr,
    checkToken: {
      notNeedTokenRouter: ['/api/admin/register', '/api/admin/login'],
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
