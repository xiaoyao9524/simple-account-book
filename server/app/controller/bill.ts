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

    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    const params: { date: string } = { ...ctx.request.body };
    const { date } = params;

    const startDate = `${date}-01`;

    const [ year, month ] = date.split('-');

    const endDate = `${year}-${month}-${getMonthLastDay(date)}`;

    const list = await ctx.service.bill.getBillListByDate(tokenParse.id, startDate, endDate);

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
    const billList = await ctx.service.bill.getBillListByCategoryId(categoryItem.id);
    console.log('billList: ', billList);
    

    if (!billList) {
      this.error('查询失败');
      return;
    }

    const categoryIdList = Array.from(new Set(billList.map(i => i.categoryId)));
    // 查询分类
    const categoryList = await ctx.service.category.getCategoryList(categoryIdList);

    console.log('categoryList: ', categoryList);
    

    if (!categoryList) {
      this.error('查询失败');
      return;
    }

    const ret: BillListItem[] = [];

    for (const item of billList) {

      console.log('item: ', item);
      

      const {
        id,
        categoryId,
        categoryType,
        billTime,
        price,
        remark
      } = item;

      const category = categoryList.find(i => i.id === categoryId);
      console.log('category: ', category);
      

      if (category) {
        const billItem = {
          id,
          categoryType,
          category,
          billTime,
          price,
          remark,
        };

        ret.push(billItem);
      }
    }
    // 说明该分类下有记账信息，需要让用户确认是否全部删除
    this.success({
      billList: ret
    });
    
    /*
    const delRes = await ctx.service.category.deleteCategory(categoryItem.id);

    if (!delRes) {
      this.error('删除失败');
      return;
    }

    this.success(null, '删除成功');
    */
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

  // 检查某个category下有没有记账信息
  async checkBillByCategoryId () {
    const { ctx, app } = this;

    const validateResult = await ctx.validate(
      app.rules.bill.checkBillByCategoryId,
      ctx.request.body
    );

    if (!validateResult) {
      return;
    }

    // 解析token
    const tokenParse: TokenParseProps = ctx.state.tokenParse;

    // 根据传参获取分类
    const { categoryId } = ctx.request.body as {categoryId: number};

    const categoryData = await ctx.service.category.getCategoryById(categoryId);

    // 一些必要的检查
    if (!categoryData) {
      this.error('要检查的分类不存在');
      return;
    } else if (categoryData.isDefault !== 1 && categoryData.pid !== tokenParse.id) {
      // 如果当前分类不是默认，则判断该分类是不是该用户创建的
      // 如果不是该用户创建，虽然存在，但是提示不存在
      this.error('要检查的分类不存在2');
      return;
    }

    // 根据该分类id去查找记账信息，只需要查找到一个就可以
    const billResult = await ctx.service.bill.findOneBillItemByCategoryId(categoryId);

    this.success({
      existBill: !!billResult
    });
  }
}

export default BillController;
