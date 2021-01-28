import request from '../utils/axios';
import {
    SignupRequestProps, 
    RegisterResponseProps,
    LoginRequestProps,
    LoginResponseProps,
    userInfoProps
} from '../types/admin';

// 注册
export const register = (data: SignupRequestProps) => (
    request<RegisterResponseProps>({
        method: 'post',
        url: '/api/admin/register',
        data
    })
)

// 登录
export function login (data: LoginRequestProps) {
    return request<LoginResponseProps>({
        method: 'post',
        url: '/api/admin/login',
        data
    })
}

// 获取用户信息
export function getUserInfo () {
    return request<userInfoProps>({
        method: 'post',
        url: '/api/admin/getUserInfo'
    })
}

export function testReq () {
    return request<{
        msg: string;
    }>({
        method: 'post',
        url: '/api/test/detail'
    })
}
