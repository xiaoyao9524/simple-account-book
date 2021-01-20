import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  exportssequelize: {
    enable: true,
    package: 'egg-sequelize-ts'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  }
};

export default plugin;
