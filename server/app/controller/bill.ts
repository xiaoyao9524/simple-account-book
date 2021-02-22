import BaseController from './BaseController';
import { getMonthLastDay } from "../util/base";
import { InsertBillRequestProps } from "../types/bill";
import { TokenParseProps } from '../types/base';

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
    const requestData: InsertBillRequestProps = {...ctx.request.body};

    /** 查询新增的分类是否存在 */
    const insertCategory = await ctx.service.category.getCategoryById(requestData.categoryId);

    console.log('insertCategory: ', insertCategory);

    if (!insertCategory || (insertCategory.pid !== tokenParse.id)) {
      this.error('选择的分类不存在！');
      return;
    }

    const insertRes = await ctx.service.bill.insertBill(ctx.request.body);

    if (!insertRes) {
      return this.error('插入失败')
    }
    
    this.success(insertRes);
  }

  async getBillListByDate () {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.getBillListByDate,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const params: {date: string} = { ...ctx.request.body };
    const { date } = params;

    const startDate = `${date}-01`;

    const [year, month] = date.split('-');

    const endDate = `${year}-${month}-${getMonthLastDay(date)}`;
    
    const list = await ctx.service.bill.getBillListByDate(startDate, endDate);

    if (!list) {
      return this.error('获取失败')
    }

    this.success(list);
  }
}

export default BillController;
