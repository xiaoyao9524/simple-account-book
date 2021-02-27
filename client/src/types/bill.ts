import { BaseResult } from './base';
import { CategoryItem } from "./category";

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
}>


// 新增记账传参
export interface InsertBillProps {
  categoryType: number;
  categoryId: number;
  price: string;
  billTime: string;
  remark?: string;
}

export type InsertBillResponse = BaseResult<BillItem>
