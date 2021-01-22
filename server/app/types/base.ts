// 基础的返回数据格式
export interface BaseResponse <T> {
  status: number;
  message: string;
  data: T;
}

// token解析格式
export interface TokenParseProps {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}
