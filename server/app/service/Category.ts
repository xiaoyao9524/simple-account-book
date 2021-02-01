import { Service } from 'egg';

import { TokenParseProps } from '../types/base';
import { InsertCategoryProps } from '../types/category';

class CategoryService extends Service {
  async insertUser(categoryDetail: InsertCategoryProps) {
    const { ctx } = this;
    const tokenParse: TokenParseProps = ctx.state.tokenParse;
    try {
      const insertData = {
        ...categoryDetail,
        is_default: 0,
        pid: tokenParse.id,
      };

      const result = await ctx.model.Category.create(insertData);

      console.log('result: ', result);
      

      return result;
    } catch (err) {
      console.log('err: ', err);
    }
  }
}

export default CategoryService;
