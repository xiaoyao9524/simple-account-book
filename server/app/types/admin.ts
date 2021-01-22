// 注册传参
export interface RegisterParams {
  username: string;
  password: string;
  avatar?: string;
}

// 获取详情传参
export interface DetailParams {
  id: number;
}

// 登录传参
export interface LoginParams {
  username: string;
  password: string;
}