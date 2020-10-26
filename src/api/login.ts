import axios from 'axios';

export const signup = (data: any) => (
    axios({
        method: 'post',
        url: '/api/admin/signup',
        data
    })
)