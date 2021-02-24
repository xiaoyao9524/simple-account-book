import { BaseResult } from './base';

export interface BillItem {
  readonly id: number;
  readonly uid: number;
  categoryId: number;
  categoryType: number;
  price: number;
  billTime: string;
  remark?: string;
}

export interface GetBillListByDateRequestProps {
  date: string;
}
/**
 * {
            "id": 5,
            "uId": 9,
            "categoryId": 6,
            "categoryType": 1,
            "price": 2,
            "billTime": "2021-01-20",
            "remark": "备注备注",
            "createTime": "2021-02-20T15:24:39.000Z",
            "updateTime": "2021-02-20T15:24:39.000Z"
        }
 */
export type GetBillListByDateResponse = BaseResult<{
  date: string;
}>