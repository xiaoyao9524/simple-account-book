import BaseController from './BaseController';
import { getMonthLastDay } from '../util/base';
import {
  InsertBillRequestProps,
  UpdateBillRequestProps,
  BillListItem,
} from '../types/bill';
import { TokenParseProps } from '../types/base';
import { CategoryItemProps } from '../types/category';
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
      billTime: dayjs(billTime).format('YYYY-MM-DD'),
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

    const categoryIds = Array.from(new Set([...list.map((i) => i.categoryId)]));

    const categoryList = await ctx.service.category.getCategoryList(
      categoryIds
    );

    if (!categoryList) {
      return this.error('分类获取失败');
    }

    const result: BillListItem[] = list.map((item) => {
      const { id, categoryId, categoryType, price, billTime, remark } = item;

      const category = categoryList.find(
        (item) => item.id === categoryId
      ) as CategoryItemProps;

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
      list: result,
    });
  }

  // 删除分类前根据分类id查找对应的记账数据
  async getBillListByCategoryId () {
    const { ctx, app } = this;
    
    const validateResult = await ctx.validate(
      app.rules.bill.getBillListByCategoryId,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    const requuestParams = ctx.request.body;

    // 先检查传入的分类id是不是该用户的
    const categoryItem = await ctx.service.category.getCategoryById(requuestParams.categoryId);

    if (!categoryItem) {
      this.error('要删除的分类不存在');
      return;
    }

    if (categoryItem.isDefault !== 0) {
      this.error('不能删除默认分类');
      return;
    } else if (categoryItem.pid !== tokenParse.id) {
      // 只能删除自己的分类
      this.error('删除失败');
      return;
    }

    // 分类可删除，获取该分类下的记账信息

    this.success({
      msg: '成功',
      categoryItem
    });
  }

  // 删除记账
  async deleteBill() {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.deleteBill,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const requestBody: { id: number } = { ...ctx.request.body };

    const delResult = await ctx.service.bill.deleteBill(requestBody.id);

    if (!delResult) {
      return this.error('删除失败');
    }

    this.success(null);
  }

  // 更新记账
  async updateBill() {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.updateBill,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    const requestParams: UpdateBillRequestProps = { ...ctx.request.body };

    const { id, categoryId, categoryType } = requestParams;

    // 判断要更新的数据存不存在
    try {
      const updateItem = await this.service.bill.findBillItemById(id);

      // 没有查到项目或者查到项目的创建者不是当前用户
      if (!updateItem || tokenParse.id !== updateItem.uId) {
        this.error('要更新的记录不存在');
        return;
      }
    } catch (err) {
      this.error('要更新的记录不存在');
      return;
    }

    // 判断分类存不存在以及合不合法
    try {
      const categoryItem = await this.service.category.getCategoryById(
        categoryId
      );

      // 没有查到或者查到的分类不是默认并且不是当前用户的分类
      if (
        !categoryItem ||
        (categoryItem.isDefault === 0 && tokenParse.id !== categoryItem.pid)
      ) {
        this.error('选择的分类不存在');
        return;
      } else if (categoryItem.categoryType !== categoryType) {
        // 收入必须对应收入分类，支出对应支出
        this.error('记账类型必须一致');
        return;
      }
    } catch (err) {
      this.error('选择的分类不存在');
      return;
    }

    // 开始更新
    try {
      const result = await ctx.service.bill.updateBillItem(requestParams);

      if (result) {
        const [resultNum] = result;

        if (resultNum > 0) {
          this.success(true);
          return;
        }
      }
    } catch (err) {
      this.error('更新失败');
      return;
    }

    this.error('更新失败');
    return;
  }
}

export default BillController;
