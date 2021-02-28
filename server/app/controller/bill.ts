import BaseController from './BaseController';
import { getMonthLastDay } from '../util/base';
import { InsertBillRequestProps, BillListItem } from '../types/bill';
import { TokenParseProps } from '../types/base';
import { CategoryItemProps } from "../types/category";
import dayjs from 'dayjs';

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
    /**
     "id": 10,
        "categoryId": 59,
        "categoryType": 0,
        "price": 240,
        "billTime": "2021-02-27T00:00:00.000Z",
        "remark": "美国末日2",
     */

     const { id, categoryId, categoryType, price, billTime } = insertRes;

     const category = await ctx.service.category.getCategoryById(categoryId);

     if (!category) {
       return this.error('插入成功但是查询分类失败');
     }

    this.success({
      id, 
      categoryType, 
      category, 
      price, 
      billTime: dayjs(billTime).format('YYYY-MM-DD')
    });
  }
  /** 获取记账列表 */
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
    
    if (!list) {
      return this.error('获取失败');
    }



    const categoryIds =  Array.from(new Set([...list.map((i) => i.categoryId)]));
    
    const categoryList = await ctx.service.category.getCategoryList(categoryIds);

    if (!categoryList) {
      return this.error('分类获取失败');
    }

    const result: BillListItem[] = list.map((item) => {
      const { id, categoryId, categoryType, price, billTime, remark } = item;

      const category =  categoryList.find(item => item.id === categoryId) as CategoryItemProps;

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

  // 删除记账
  async deleteBill () {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.deleteBill,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const requestBody: {id: number} = {...ctx.request.body};

    const delResult = await ctx.service.bill.deleteBill(requestBody.id);

    if (!delResult) {
      return this.error('删除失败');
    }

    this.success(null);
  }
}

export default BillController;
