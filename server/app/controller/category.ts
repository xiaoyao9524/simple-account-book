import BaseController from './BaseController';

import { InsertCategoryProps } from '../types/category';

import { incomeIcons } from '../data/categoryList';

import { CategoryItemProps } from '../types/category';

class CategoryController extends BaseController {
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
      ...ctx.request.body
    }

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
      categoryType
    });
  }

  /**test */
  async getCategoryList () {
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
      expenditureIcons: expenditureIcons.map(i => i.id).join(','),
      incomeIcons: incomeIcons.map(i => i.id).join(',')
    });
  }

  async insertDefaultCategory() {
    const { ctx } = this;

    const errList:any[] = [];

    for (let item of incomeIcons) {
      const insertRes = await ctx.service.category.insertDefaultCategory(item);

      if (!insertRes) {
        console.error('插入失败：', item);
        errList.push(item);
      }
    }

    if (errList.length) {
      console.log('errList: ', errList)
    } else {
      console.log('全部完成')
    }

    this.success();
  }
}

export default CategoryController;
