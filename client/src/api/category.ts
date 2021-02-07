import request from '../utils/axios';

// 注册
export const register = () => (
    request({
        method: 'post',
        url: '/api/admin/register'
    })
)
