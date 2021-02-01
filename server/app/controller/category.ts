import BaseController from './BaseController';

import { InsertCategoryProps } from '../types/category';
// const md5 = require('md5');

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

    const insertRes = await ctx.service.category.insertUser(params);
    
    console.log('插入分类Res: ', insertRes);
    

    if (!insertRes) {
      this.error('注册失败');
      return;
    }

    this.success();
  }
}

export default CategoryController;
