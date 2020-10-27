import axios from '../utils/axios';

interface ISignupResultProps {
    status: number;
    message: string;
}

export const signup = (data: any) => (
    axios<ISignupResultProps>({
        method: 'post',
        url: '/api/admin/signup',
        data
    })
)