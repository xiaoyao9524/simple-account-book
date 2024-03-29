import BaseController from './BaseController';

import { InsertCategoryProps } from '../types/category';
import { CategoryItemProps } from '../types/category';
import { TokenParseProps } from '../types/base';

import { classifyCategory, sortCategoryList } from '../util/category';

// import { incomeIcons, expenditureIcons } from '../data/categoryList';

class CategoryController extends BaseController {
  /** 创建类别 */
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

    // 3、更新用户表收入支出列表
    const updateCategoryRes = await ctx.service.user.updateCategoryList(
      userInfo.id,
      newCategoryParams
    );

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
    }

    const _expenditureList: CategoryItemProps[] = [];

    for (const id of expenditureList) {
      const item = newExpenditureList.find(i => i.id === id);

      if (item) {
        _expenditureList.push(item);
      }
    }
    newExpenditureList = _expenditureList;

    let newIncomeList = await ctx.service.category.getCategoryList(incomeList);

    if (!newIncomeList) {
      this.error('获取收入类别失败');
      return;
    }

    const _incomeist: CategoryItemProps[] = [];

    for (const id of incomeList) {
      const item = newIncomeList.find(i => i.id === id);

      if (item) {
        _incomeist.push(item);
      }
    }
    newIncomeList = _incomeist;

    this.success({
      expenditureList: newExpenditureList,
      incomeList: newIncomeList,
    });
  }

  /** 删除类别(分类下无记账的情况) */
  async deleteCategory() {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.category.deleteCategory,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    // 解析token
    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    const { id }: { id: number } = ctx.request.body;

    // 获取完整的分类数据
    const categoryData = await ctx.service.category.getCategoryById(id);

    if (!categoryData) {
      this.error('要删除的分类不存在');
      return;
    }

    // 判断该分类是不是默认分类
    // if (categoryData.isDefault === 1) {
    //   this.error('无法删除默认分类');
    //   return;
    // }

    // 判断该分类是不是该用户创建的
    if (categoryData.isDefault !== 1 && categoryData.pid !== tokenParse.id) {
      this.error('要删除的分类不存在');
      return;
    }

    // 如果是用户创建分类，那么去删除该条分类数据
    let delRes: number | null = null;

    if (categoryData.isDefault !== 1) {
      delRes = await ctx.service.category.deleteCategory(id);

      if (!delRes) {
        this.error('删除失败');
        return;
      }
    }

    // 更新用户的分类列表
    const userInfo = await ctx.service.user.getUser({
      id: tokenParse.id
    });

    if (!userInfo) {
      this.error('该用户不存在');
      return;
    }

    const { expenditureList, incomeList } = userInfo;
    const isExpenditure = categoryData.categoryType === 1;

    const categoryIdList = (isExpenditure ? expenditureList : incomeList)
      .split(',')
      .map(i => Number(i));

    const delIndex = categoryIdList.indexOf(id);

    if (delIndex > -1) {
      categoryIdList.splice(delIndex, 1);
    }

    // 如果isExpenditure为true，那么说明categoryIdList就是支出分类，否则categoryIdList就是收入分类
    const newExpenditureList = isExpenditure ? categoryIdList : expenditureList.split(',').map(i => Number(i));
    const newIncomeList = isExpenditure ? incomeList.split(',').map(i => Number(i)) : categoryIdList;

    const updateUserCategoryRes = await ctx.service.user.updateCategoryList(tokenParse.id, {
      expenditureList: newExpenditureList,
      incomeList: newIncomeList
    });

    console.log('更新用户分类Res: ', updateUserCategoryRes);

    if (!updateUserCategoryRes) {
      this.error('删除失败');
      return;
    }
    
    if (!updateUserCategoryRes[0]) {
      this.error('删除失败');
      return;
    }

    this.success(null);
  }

  /** 获取某用户现有的分类信息 */
  async getCurrentUserCategory () {
    const { ctx } = this;

    const tokenParse: TokenParseProps = { ...ctx.state.tokenParse };

    // 获取用户信息
    const userInfo = await ctx.service.user.getUser({
      id: tokenParse.id
    });

    if (!userInfo) {
      this.error('该用户不存在');
      return;
    }

    // 去获取用户分类
    const { expenditureList, incomeList } = userInfo;

    const expenditureIdList = expenditureList.split(',').map(i => Number(i));
    const expenditureDataList = await ctx.service.category.getCategoryList(expenditureIdList);

    const incomeIdList = incomeList.split(',').map(i => Number(i));
    const incomeDataList = await ctx.service.category.getCategoryList(incomeIdList);

    if (!expenditureDataList || !incomeDataList) {
      this.error('获取失败');
      return;
    }

    // 排序
    const expenditureRet = [ ...expenditureDataList ].map(i => ({
      ...i,
      sortIndex: expenditureIdList.indexOf(i.id)
    }));

    const incomeRet = [ ...incomeDataList ].map(i => ({
      ...i,
      sortIndex: incomeIdList.indexOf(i.id)
    }));
    

    this.success({
      expenditureList: expenditureRet.sort((a, b) => a.sortIndex - b.sortIndex),
      incomeList: incomeRet.sort((a, b) => a.sortIndex - b.sortIndex)
    });
  }

  /** 删除类别并删除该类别下的记账信息 */
  async deleteCategoryAndBill () {
    const { ctx, app } = this;
    const validateResult = await ctx.validate(
      app.rules.category.deleteCategory,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    // 解析token
    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    const { id }: { id: number } = ctx.request.body;

    // 获取完整的分类数据
    const categoryData = await ctx.service.category.getCategoryById(id);

    if (!categoryData) {
      this.error('要删除的分类不存在');
      return;
    }

    // 判断该分类是不是该用户创建的
    if (categoryData.isDefault !== 1 && categoryData.pid !== tokenParse.id) {
      this.error('要删除的分类不存在');
      return;
    }

    // 去获取该用户该分类下的记账信息
    const billList = await ctx.service.bill.getBillListByCategoryId(tokenParse.id, ctx.request.body.id);
    
    // 删除记账信息
    if (billList && billList.length) {
      const delBillRes = await ctx.service.bill.deleteBill(billList.map(i => i.id));

      if (!delBillRes) {
        this.error('删除失败');
        return;
      }
    }

    // 删除分类

    const delCategoryRes = await ctx.service.category.deleteCategory(categoryData.id);

    if (!delCategoryRes) {
      this.error('删除失败');
      return;
    }

    this.success(true, '删除成功');

  }

  /** 某用户将某默认分类添加到当前分类中 */
  async addCategoryToCurrent () {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.category.addCategoryToCurrent,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const requestParams = ctx.request.body as {categoryId: number};

    const tokenParse: TokenParseProps = { ...ctx.state.tokenParse };

    // 获取用户信息
    const userInfo = await ctx.service.user.getUser({
      id: tokenParse.id
    });

    if (!userInfo) {
      this.error('该用户不存在');
      return;
    }

    // 获取分类信息
    const categoryData = await ctx.service.category.getCategoryById(requestParams.categoryId);

    // 按理来说这里只有默认分类才能添加，自定义分类删除的时候已经全部删除了
    if (!categoryData || categoryData.isDefault !== 1) {
      this.error('该分类不存在');
      return;
    }

    const isExpenditure = categoryData.categoryType === 1;

    const categoryIdList = (isExpenditure ? userInfo.expenditureList : userInfo.incomeList).split(',').map(i => Number(i));

    if (categoryIdList.includes(requestParams.categoryId)) {
      this.error('该分类已存在');
      return;
    }

    categoryIdList.push(requestParams.categoryId);

    const expenditureList = isExpenditure ? categoryIdList : userInfo.expenditureList.split(',').map(i => Number(i));
    const incomeList = isExpenditure ? userInfo.incomeList.split(',').map(i => Number(i)) : categoryIdList;

    const result = await ctx.service.user.updateCategoryList(tokenParse.id, {
      expenditureList,
      incomeList
    });

    if (!result || !result[0]) {
      this.error('添加失败');
      return;
    }

    this.success(true);
  }



  /** test */
  async getCategoryList() {
    const { ctx } = this;

    const categoryList = await ctx.service.category.getCategoryList();

    if (!categoryList) {
      this.error('获取分类失败');
      return;
    }

    const expenditureIcons: CategoryItemProps[] = [];
    const incomeIcons: CategoryItemProps[] = [];

    if (categoryList) {
      for (const item of categoryList) {
        const { categoryType } = item;
        if (categoryType === 0) {
          incomeIcons.push(item);
        } else {
          expenditureIcons.push(item);
        }
      }
    }

    this.success({
      expenditureIcons: expenditureIcons.map(i => i.id).join(','),
      incomeIcons: incomeIcons.map(i => i.id).join(','),
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
