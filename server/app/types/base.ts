// 基础的返回数据格式
export interface BaseResponse <T> {
  status: number;
  message: string;
  data: T;
}