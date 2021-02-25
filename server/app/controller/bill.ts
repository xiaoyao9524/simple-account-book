import BaseController from './BaseController';
import { getMonthLastDay } from '../util/base';
import { InsertBillRequestProps, BillListItem } from '../types/bill';
import { TokenParseProps } from '../types/base';
import { CategoryItemProps } from "../types/category";

class BillController extends BaseController {
  /** 新增记账 */
  async insertBill() {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.insertBill,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const tokenParse: TokenParseProps = ctx.state.tokenParse;
    const requestData: InsertBillRequestProps = { ...ctx.request.body };

    /** 查询新增的分类是否存在 */
    const insertCategory = await ctx.service.category.getCategoryById(
      requestData.categoryId
    );

    if (!insertCategory) {
      this.error('选择的分类不存在！');
      return;
    } else if (
      insertCategory.isDefault === 0 &&
      insertCategory.pid !== tokenParse.id
    ) {
      this.error('必须选择自己创建的的分类！');
      return;
    }

    const insertRes = await ctx.service.bill.insertBill(ctx.request.body);

    if (!insertRes) {
      return this.error('插入失败');
    }

    this.success(insertRes);
  }

  async getBillListByDate() {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.getBillListByDate,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const params: { date: string } = { ...ctx.request.body };
    const { date } = params;

    const startDate = `${date}-01`;

    const [year, month] = date.split('-');

    const endDate = `${year}-${month}-${getMonthLastDay(date)}`;

    const list = await ctx.service.bill.getBillListByDate(startDate, endDate);

    console.log('list: ', list);
    

    if (!list) {
      return this.error('获取失败');
    }



    const categoryIds =  Array.from(new Set([...list.map((i) => i.categoryId)]));
    console.log('categoryIds: ', categoryIds);
    
    const categoryList = await ctx.service.category.getCategoryList(categoryIds);

    console.log('category: ', categoryList);

    if (!categoryList) {
      return this.error('分类获取失败');
    }

    const result: BillListItem[] = list.map((item) => {
      const { id, categoryId, categoryType, price, billTime, remark } = item;

      const category =  categoryList.find(item => item.id === categoryId) as CategoryItemProps;

      console.log('category-222: ', id, category);
      

      return {
        id,
        category,
        categoryType,
        price,
        billTime,
        remark,
      };
    });

    this.success({
      list: result
    });
  }
}

export default BillController;
