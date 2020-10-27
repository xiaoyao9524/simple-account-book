import {
    UserInfo
} from './base';

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

// 获取token请求
export interface SigninRequestProps {
    username: string;
    password: string;
}
// 获取token返回
export interface SigninResponseProps {
    status: number;
    message: string;
    token?: string;
}

// 获取用户信息返回
export interface RequestUserInfoResponseProps {
    status: number;
    message: string;
    userInfo: UserInfo;
}
