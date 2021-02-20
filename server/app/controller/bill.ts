import BaseController from './BaseController';

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

    const insertRes = await ctx.service.bill.insertBill(ctx.request.body);

    console.log('insertRes-33333333333: ', insertRes);
    

    if (!insertRes) {
      return this.error('插入失败')
    }
    
    this.success(insertRes);
  }



  async getBillListByDate () {
    const { ctx } = this;

    const params: {startDate: string, endDate: string} = {...ctx.request.body };
    const { startDate, endDate } = params;
    
    const list = await ctx.service.bill.getBillListByDate(startDate, endDate);

    if (!list) {
      return this.error('获取失败')
    }

    this.success(list);
  }
}

export default BillController;
