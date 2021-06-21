import { BaseResult } from './base';
import { CategoryItem } from './category';

export interface BillItem {
  readonly id: number;
  readonly uid: number;
  category: CategoryItem;
  categoryType: number;
  price: number;
  billTime: string;
  remark?: string;
}

export interface GetBillListByDateRequestProps {
  date: string;
}

export type GetBillListByDateResponse = BaseResult<{
  list: BillItem[];
}>;

// 新增记账传参
export interface InsertBillProps {
  categoryType: number;
  categoryId: number;
  price: string;
  billTime: string;
  remark?: string;
}

// 新增记账返回
export type InsertBillResponse = BaseResult<BillItem>;

// 更新记账传参
export interface UpdateBillProps extends InsertBillProps {
  id: number;
}

// 更新记账返回
export type UpdateBillResponse = BaseResult<boolean>;


// 删除记账传参
export interface DeleteBillProps {
  id: number;
}

// 删除记账返回
export type DeleteBillResponse = BaseResult<null>;
