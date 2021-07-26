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

    console.log('user: ', user);

    const { username, avatar, createTime } = user;

    const expenditureIds = user.expenditureList.split(',').map(i => Number(i));
    let expenditureList = await ctx.service.category.getCategoryList(expenditureIds);

    if (!expenditureList) {
      this.error('获取支出列表失败');
      return
    } else {
      const _expenditureList: CategoryItemProps[] = [];

      for (let id of expenditureIds) {
        const item = expenditureList.find(i => i.id === id);

        if (item) {
          _expenditureList.push(item);
        }
      }
      expenditureList = _expenditureList;
    }

    const incomeIds = user.incomeList.split(',').map(i => Number(i));
    let incomeList = await ctx.service.category.getCategoryList(incomeIds);

    if (!incomeList) {
      this.error('获取收入列表失败');
      return
    } else {
      const _incomeList: CategoryItemProps[] = [];

      for (let id of incomeIds) {
        const item = incomeList.find(i => i.id === id);

        if (item) {
          _incomeList.push(item);
        }
      }
      incomeList = _incomeList;
    }

    // 计算记账天数
    const currentTimeStamp = new Date().getTime();
    const userCreateTimeStamp = new Date(createTime).getTime();
    const bookkeepingDays = Math.ceil((currentTimeStamp - userCreateTimeStamp) / 86400000);

    // 计算记账笔数
    const bookkeepCountRes = await ctx.service.bill.getBookkeepCount(id);
    let bookkeepCount = 0;
    if (bookkeepCountRes) {
      bookkeepCount = bookkeepCountRes.count;
    }

    const ret = {
      username,
      avatar,
      bookkeepingDays,
      bookkeepCount,
      category: {
        expenditureList,
        incomeList
      }
    };

    this.success(ret);

  }

  async logout () {
    const { ctx, app } = this;

    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    ctx.cookies.set('token', null, {
      maxAge: app.config.tokenExpiresMS,
    });

    app.redis.del(
      `user_${tokenParse.username}_token`
    );

    this.success(null, '退出成功');
  }
}

export default AdminController;
