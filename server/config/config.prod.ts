import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

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

  return config;
};
