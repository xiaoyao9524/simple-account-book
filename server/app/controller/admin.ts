import BaseController from './BaseController';

import { SignupRequestProps, LoginParams } from '../types/admin';
import { TokenParseProps } from '../types/base';
import { CategoryItemProps } from '../types/category';
const md5 = require('md5');

class AdminController extends BaseController {
  async register() {
    const { ctx, app } = this;
    const params: SignupRequestProps = ctx.request.body;
    const registerRules = app.rules.admin.register;

    const validateResult = await ctx.validate(registerRules, ctx.request.body);

    if (!validateResult) {
      return;
    }

    const { password, confirmPassword } = params;

    if (password !== confirmPassword) {
      this.error('两次密码输入不一致！');
      return;
    }

    const user = await ctx.service.user.getUser({ username: params.username });

    if (user) {
      this.error('用户已存在');
      return;
    }

    // 生成默认的分类列表
    const categoryListData = await ctx.service.category.getCategoryList();
    const expenditureList: CategoryItemProps[] = [];
    const incomeList: CategoryItemProps[] = [];

    if (categoryListData) {
      for (let item of categoryListData) {
        if (item.categoryType === 0) {
          incomeList.push(item);
        } else {
          expenditureList.push(item);
        }
      }
    } else {
      this.error('注册失败');
      return;
    }

    const insertRes = await ctx.service.user.insertUser({
      ...params,
      expenditureList: expenditureList.map(i => i.id).join(','),
      incomeList: incomeList.map(i => i.id).join(',')
    });

    if (!insertRes) {
      this.error('注册失败');
      return;
    }

    

    const { id, username } = insertRes;

    const token = ctx.encodeToken({ id, username });

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpiresMS,
    });

    app.redis.set(
      `user_${username}_token`,
      token,
      'EX',
      app.config.tokenExpiresSeconds
    );

    this.success({ token });
  }

  async login() {
    const { ctx, app } = this;

    const params: LoginParams = ctx.request.body;

    const loginRules = app.rules.admin.login;

    const validateResult = await ctx.validate(loginRules, ctx.request.body);

    if (!validateResult) {
      return
    }

    const { username, password } = params;

    const user = await ctx.service.user.getUser({ username });

    if (!user) {
      this.error('未找到该用户');
      return;
    }
    const secret = app.config.secret;
    const md5Pwd = md5(`${password}${secret}`);

    if (md5Pwd !== user.password) {
      this.error('账号或密码错误');
      return;
    }

    const token = ctx.encodeToken({
      id: user.id,
      username: user.username,
    });

    ctx.cookies.set('token', token, {
      maxAge: app.config.tokenExpiresMS,
    });

    app.redis.set(
      `user_${user.username}_token`,
      token,
      'EX',
      app.config.tokenExpiresSeconds
    );

    this.success({ token });
  }

  async getUserInfo () {
    const { ctx } = this;

    const { id } = ctx.state.tokenParse as TokenParseProps;

    const user = await ctx.service.user.getUser({id});

    if (!user) {
      this.error('用户不存在');
      return;
    }

    const {username, avatar} = user;

    // const categoryList = await ctx.service.category.getCategoryList(user.categoryList.split(',').map(i => Number(i)));
    const expenditureIcons = await ctx.service.category.getCategoryList(user.expenditureList.split(',').map(i => Number(i)));
    const incomeIcons = await ctx.service.category.getCategoryList(user.incomeList.split(',').map(i => Number(i)));

    if (!expenditureIcons || !incomeIcons) {
      this.error('获取失败');
      return
    }

    const ret = {
      username,
      avatar,
      category: {
        incomeIcons,
        expenditureIcons
      }
    }

    this.success({...ret})

  }
}

export default AdminController;
