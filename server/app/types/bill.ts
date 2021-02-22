// 新增传参
export interface InsertBillRequestProps {
  categoryId: number;
  categoryType: number;
  price: string;
  billTime: string;
  remark?: string;
}
