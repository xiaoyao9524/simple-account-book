import { CategoryItemProps } from "./category";
// 新增传参
export interface InsertBillRequestProps {
  categoryId: number;
  categoryType: number;
  price: string;
  billTime: string;
  remark?: string;
}

export interface BillListItem {
  readonly id: number;
  category: CategoryItemProps;
  categoryType: number;
  price: number;
  billTime: Date;
  remark?: string;
}
