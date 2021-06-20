import { CategoryItemProps } from './category';

// 新增记账传参
export interface InsertBillRequestProps {
  categoryId: number;
  categoryType: number;
  price: string;
  billTime: string;
  remark?: string;
}

// 更新记账传参
export interface UpdateBillRequestProps extends InsertBillRequestProps {
  readonly id: number;
}

// 分类列表项
export interface BillListItem {
  readonly id: number;
  category: CategoryItemProps;
  categoryType: number;
  price: number;
  billTime: Date;
  remark?: string;
}
