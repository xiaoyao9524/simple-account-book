import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611128577302_2474';

  // add your egg config in here
  config.middleware = [];

  config.jwt = {
    secret: '9524', //自定义 token 的加密条件字符串
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
      freezeTableName: true // 使用原来的表名称，不需要sequelize处理表名称
    }
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
