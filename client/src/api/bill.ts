import request from '../utils/axios';
import {
  GetBillListByDateRequestProps,
  GetBillListByDateResponse,
  InsertBillProps,
  InsertBillResponse
} from "../types/bill";

// 获取该用户下所有的类别列表，包含默认分类以及该用户删除的分类
export const getBillListByDate = (data: GetBillListByDateRequestProps) => (
    request<GetBillListByDateResponse>({
        method: 'post',
        url: '/api/bill/getBillListByDate',
        data
    })
);

// 新增记账
/**
 
 */
export const insertBill = (data: InsertBillProps) => (
  request<InsertBillResponse>({
      method: 'post',
      url: '/api/bill/insertBill',
      data
  })
);