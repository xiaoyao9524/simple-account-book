import request from '../utils/axios';
import { GetAllCategoryListResult } from "../types/category";


// 获取该用户下所有的类别列表，包含默认分类以及该用户删除的分类
export const getAllCategoryList = () => (
    request<GetAllCategoryListResult>({
        method: 'post',
        url: '/api/category/getAllCategoryList'
    })
)
