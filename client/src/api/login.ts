import axios from '../utils/axios';
import {
    SignupRequestProps, 
    SignupResultProps,
    SigninRequestProps,
    // SigninResponseProps,
    LoginResponse,
    RequestUserInfoResponseProps
} from '../types/login';


export const signup = (data: SignupRequestProps) => (
    axios<SignupResultProps>({
        method: 'post',
        url: '/api/admin/signup',
        data
    })
)

// 获取token
export function signin (data: SigninRequestProps) {
    return axios<LoginResponse>({
        method: 'post',
        url: '/api/admin/login',
        data
    })
}

// 获取用户信息
export function requestUserInfo () {
    return axios<RequestUserInfoResponseProps>({
        method: 'post',
        url: '/api/admin/getUserInfo'
    })
}
