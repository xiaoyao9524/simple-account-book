import { BaseResult } from './base';
import { UserInfo } from './user';

// 注册请求
export interface SignupRequestProps {
  username: string;
  password: string;
  confirmPassword: string;
}

// 注册返回
export type RegisterResponseProps = BaseResult<{
  token: string;
}>;

// 登录请求
export interface LoginRequestProps {
  username: string;
  password: string;
}

// 登录返回
export type LoginResponseProps = BaseResult<{
  token: string;
}>;

// 获取用户信息返回
export type userInfoProps = BaseResult<UserInfo>;
