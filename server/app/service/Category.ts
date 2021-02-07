import { Service } from 'egg';

import { TokenParseProps } from '../types/base';
import { InsertCategoryProps } from '../types/category';
import { Op } from 'sequelize';

class CategoryService extends Service {
  // 新增类别
  async insertCategory(categoryDetail: InsertCategoryProps) {
    const { ctx } = this;
    const tokenParse: TokenParseProps = ctx.state.tokenParse;
    try {
      const insertData = {
        ...categoryDetail,
        is_default: 0,
        pid: tokenParse.id,
      };

      const result = await ctx.model.Category.create(insertData);

      return result;
    } catch (err) {
      console.log('err: ', err);
      return null;
    }
  }

  // 获取某用户下全部的类别，包含该用户移除的类别（所有默认的 + 该用户新建的）
  async getAllCategoryList (pid: number) {
    const { ctx } = this;
    
    try {
      const result = await ctx.model.Category.findAll({
        where: {
          [Op.or]: [
            {
              isDefault: 1
            },
            {
              pid
            }
          ]
        }
      })

      return result;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }

  async getCategoryList(ids?: number[]) {
    const { ctx } = this;
    /**
     * 如果有ids，按照ids获取
     * 如果没有，获取默认的分类
     */
    const where: {
      id?: number | number[];
      isDefault?: number;
    } = {};

    if (ids && ids.length) {
      where.id = ids;
    } else {
      where.isDefault = 1;
    }

    try {
      const result = await ctx.model.Category.findAll({
        where,
      });

      const ret =  result.map((item) => {
        const { id, categoryType, title, icon } = item;

        return {
          id,
          categoryType,
          title,
          icon,
        };
      });

      return ret;
    } catch (err) {
      return null;
    }
  }

  /**插入默认数据 */
  async insertDefaultCategory(categoryDetail: { title: string; icon: string }) {
    const { ctx } = this;
    // const tokenParse: TokenParseProps = ctx.state.tokenParse;
    try {
      const insertData = {
        ...categoryDetail,
        categoryType: 0,
        is_default: 1,
      };

      const result = await ctx.model.Category.create(insertData);

      return result;
    } catch (err) {
      return null;
    }
  }
}

export default CategoryService;
