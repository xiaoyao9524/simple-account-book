// 注册传参
// 注册请求
export interface SignupRequestProps {
  username: string;
  password: string;
  confirmPassword: string;
}
// 注册返回
export interface SignupResultProps {
  status: number;
  message: string;
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