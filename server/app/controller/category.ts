import BaseController from './BaseController';

import { InsertCategoryProps } from '../types/category';
import { CategoryItemProps } from '../types/category';
import { TokenParseProps } from '../types/base';

import { classifyCategory } from '../util/category';

import { incomeIcons } from '../data/categoryList';

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

    const insertRes = await ctx.service.category.insertCategory(params);

    if (!insertRes) {
      this.error('注册失败');
      return;
    }

    const { id, title, icon, categoryType } = insertRes;

    this.success({
      id,
      title,
      icon,
      categoryType,
    });
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
      incomeList
    });
  }

  /** 更新某用户当前类别 */
  async updateCategory () {
    console.time('更新类别时间统计');
    const { ctx, app } = this;
    const validateResult = await ctx.validate(
      app.rules.category.updateCategory,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const tokenParse: TokenParseProps = {...ctx.state.tokenParse};
    const { id } = tokenParse;

    let { expenditureList, incomeList } = ctx.request.body as {expenditureList: number[], incomeList: number[]};

    // 去重
    expenditureList = Array.from(new Set(expenditureList));
    incomeList = Array.from(new Set(incomeList));

    const result = await ctx.service.user.updateCategoryList(id, {
      expenditureList,
      incomeList
    });

    if (!result) {
      this.error('修改失败');
      return
    }

    let newExpenditureList = await ctx.service.category.getCategoryList(expenditureList);

    if (!newExpenditureList) {
      this.error('获取支出类别失败');
      return
    } else {
      const _expenditureList: CategoryItemProps[] = [];
      
      for (let id of expenditureList) {
        let item = newExpenditureList.find(i => i.id === id);

        if (item) {
          _expenditureList.push(item);
        }
      }
      newExpenditureList = _expenditureList;
    }

    let newIncomeList = await ctx.service.category.getCategoryList(incomeList);

    if (!newIncomeList) {
      this.error('获取收入类别失败');
      return
    } else {
      const _incomeist: CategoryItemProps[] = [];
      
      for (let id of incomeList) {
        let item = newIncomeList.find(i => i.id === id);

        if (item) {
          _incomeist.push(item);
        }
      }
      newIncomeList = _incomeist;
    }

    this.success({
      expenditureList: newExpenditureList,
      incomeList: newIncomeList
    });
    console.timeEnd('更新类别时间统计')
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
}

export default CategoryController;
