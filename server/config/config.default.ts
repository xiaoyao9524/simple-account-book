import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  // 60 * 60
  const secret = '9524'; // token和md5加密字符串
  const tokenExpiresStr = '1h'; // token过期时间（秒）
  const tokenExpiresMS = 60 * 60 * 1 * 1000; // token过期时间（毫秒）
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

  config.sequelize = {
    dialect: 'mysql', // 指定数据源
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'simple_account_book',
    define: {
      timestamps: false, // 不需要自动为我们添加时间相关字段
      freezeTableName: true, // 使用原来的表名称，不需要sequelize处理表名称
    },
    timezone: '+08:00',
  };

  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: '123456',
      db: 0, // 默认为0
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    secret,
    // tokenExpire: 60 * 60 * 24 * 1000, // token过期时间
    tokenExpiresStr,
    tokenExpiresMS,
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
