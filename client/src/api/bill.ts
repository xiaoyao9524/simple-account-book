import request from '../utils/axios';
import {
  GetBillListByDateRequestProps,
  GetBillListByDateResponse,
  InsertBillProps,
  InsertBillResponse,
  DeleteBillProps,
  DeleteBillResponse
} from "../types/bill";

// 获取记账列表
export const getBillListByDate = (data: GetBillListByDateRequestProps) => (
    request<GetBillListByDateResponse>({
        method: 'post',
        url: '/api/bill/getBillListByDate',
        data
    })
);

// 新增记账
export const insertBill = (data: InsertBillProps) => (
  request<InsertBillResponse>({
      method: 'post',
      url: '/api/bill/insertBill',
      data
  })
);

// 删除记账
export const deleteBill = (data: DeleteBillProps) => (
  request<DeleteBillResponse>({
      method: 'delete',
      url: '/api/bill/deleteBill',
      data
  })
);