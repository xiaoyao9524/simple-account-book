import BaseController from './BaseController';

import { InsertCategoryProps } from '../types/category';
import { CategoryItemProps } from '../types/category';
import { TokenParseProps } from '../types/base';

import { classifyCategory, sortCategoryList } from '../util/category';

// import { incomeIcons, expenditureIcons } from '../data/categoryList';

class CategoryController extends BaseController {
  /** 新增类别 */
  async insert() {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.category.insert,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const params: InsertCategoryProps = {
      ...ctx.request.body,
    };

    // 1、插入数据
    const insertRes = await ctx.service.category.insertCategory(params);

    if (!insertRes) {
      this.error('插入数据失败');
      return;
    }

    console.log('insertRes: ', insertRes);

    // 2、添加到用户表类别
    const userInfo = await ctx.service.user.getUser({
      id: ctx.state.tokenParse.id,
    });

    if (!userInfo) {
      this.error('获取用户失败');
      return;
    }

    // const { expenditureList, incomeList } = userInfo;

    const expenditureList = userInfo.expenditureList
      .split(',')
      .map((i) => Number(i));
    const incomeList = userInfo.incomeList.split(',').map((i) => Number(i));

    const { categoryType } = insertRes;

    const isIncome = categoryType === 0;

    const newList = isIncome ? [...incomeList] : [...expenditureList];
    newList.push(insertRes.id);

    const newCategoryParams = {
      expenditureList,
      incomeList,
    };

    if (isIncome) {
      newCategoryParams.incomeList = newList;
    } else {
      newCategoryParams.expenditureList = newList;
    }

    console.log('newCategoryParams: ', newCategoryParams);

    // 3、更新用户表收入支出列表
    const updateCategoryRes = await ctx.service.user.updateCategoryList(
      userInfo.id,
      newCategoryParams
    );

    console.log('updateCategoryRes: ', updateCategoryRes);

    if (!updateCategoryRes) {
      this.error('更新用户信息失败！');
      return;
    }

    const ret: {
      expenditureList: CategoryItemProps[];
      incomeList: CategoryItemProps[];
    } = {
      expenditureList: [],
      incomeList: [],
    };

    let _expenditureIds: number[] = [];
    let _incomeIds: number[] = [];
    if (insertRes.categoryType === 0) {
      // 更新了收入类别
      _expenditureIds = [...expenditureList];
      _incomeIds = [...newList];
    } else {
      // 更新了支出类别
      _expenditureIds = [...newList];
      _incomeIds = [...incomeList];
    }

    const _expenditureList = await ctx.service.category.getCategoryList([
      ..._expenditureIds,
    ]);
    const _incomeList = await ctx.service.category.getCategoryList([
      ..._incomeIds,
    ]);

    if (!_expenditureList || !_incomeList) {
      this.error('获取新类别失败');
      return;
    }

    // 4、根据用户排序后返回
    ret.expenditureList = sortCategoryList(_expenditureIds, _expenditureList);
    ret.incomeList = sortCategoryList(_incomeIds, _incomeList);

    this.success(ret);
  }

  /** 获取某用户所有的类别 */
  async getAllCategoryList() {
    const { ctx } = this;

    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    const allCategoryList = await ctx.service.category.getAllCategoryList(
      tokenParse.id
    );

    if (!allCategoryList) {
      this.error('获取失败！');
      return;
    }

    const { expenditureList, incomeList } = classifyCategory(allCategoryList);
    this.success({
      expenditureList,
      incomeList,
    });
  }

  /** 更新某用户当前类别 */
  async updateCategory() {
    console.time('更新类别时间统计');
    const { ctx, app } = this;
    const validateResult = await ctx.validate(
      app.rules.category.updateCategory,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const tokenParse: TokenParseProps = { ...ctx.state.tokenParse };
    const { id } = tokenParse;

    let { expenditureList, incomeList } = ctx.request.body as {
      expenditureList: number[];
      incomeList: number[];
    };

    // 去重
    expenditureList = Array.from(new Set(expenditureList));
    incomeList = Array.from(new Set(incomeList));

    const result = await ctx.service.user.updateCategoryList(id, {
      expenditureList,
      incomeList,
    });

    if (!result) {
      this.error('修改失败');
      return;
    }

    let newExpenditureList = await ctx.service.category.getCategoryList(
      expenditureList
    );

    if (!newExpenditureList) {
      this.error('获取支出类别失败');
      return;
    } else {
      const _expenditureList: CategoryItemProps[] = [];

      for (let id of expenditureList) {
        let item = newExpenditureList.find((i) => i.id === id);

        if (item) {
          _expenditureList.push(item);
        }
      }
      newExpenditureList = _expenditureList;
    }

    let newIncomeList = await ctx.service.category.getCategoryList(incomeList);

    if (!newIncomeList) {
      this.error('获取收入类别失败');
      return;
    } else {
      const _incomeist: CategoryItemProps[] = [];

      for (let id of incomeList) {
        let item = newIncomeList.find((i) => i.id === id);

        if (item) {
          _incomeist.push(item);
        }
      }
      newIncomeList = _incomeist;
    }

    this.success({
      expenditureList: newExpenditureList,
      incomeList: newIncomeList,
    });
    console.timeEnd('更新类别时间统计');
  }

  /**test */
  async getCategoryList() {
    const { ctx } = this;

    const categoryList = await ctx.service.category.getCategoryList();

    console.log('categoryList: ', categoryList);

    if (!categoryList) {
      this.error('获取分类失败');
      return;
    }

    const expenditureIcons: CategoryItemProps[] = [];
    const incomeIcons: CategoryItemProps[] = [];

    if (categoryList) {
      for (let item of categoryList) {
        const { categoryType } = item;
        if (categoryType === 0) {
          incomeIcons.push(item);
        } else {
          expenditureIcons.push(item);
        }
      }
    }

    this.success({
      expenditureIcons: expenditureIcons.map((i) => i.id).join(','),
      incomeIcons: incomeIcons.map((i) => i.id).join(','),
    });
  }

  /*
  async insertDefaultCategory() {
    const { ctx } = this;

    const errList: any[] = [];

    for (let item of incomeIcons) {
      const insertRes = await ctx.service.category.insertDefaultCategory(item);

      if (!insertRes) {
        console.error('插入失败：', item);
        errList.push(item);
      }
    }

    if (errList.length) {
      console.log('errList: ', errList);
    } else {
      console.log('全部完成');
    }

    this.success();
  }
  */
}

export default CategoryController;
