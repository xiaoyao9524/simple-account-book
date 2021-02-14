import request from '../utils/axios';
import { 
    GetAllCategoryListResult,
    InsertCategoryProps,
    InsertCategoryResultProps,
    UpdateCategoryParams,
    UpdateCategoryResult
} from "../types/category";


// 获取该用户下所有的类别列表，包含默认分类以及该用户删除的分类
export const getAllCategoryList = () => (
    request<GetAllCategoryListResult>({
        method: 'post',
        url: '/api/category/getAllCategoryList'
    })
)

// 新增类别
export const insertCategory = (data: InsertCategoryProps) => (
    request<InsertCategoryResultProps>({
        method: 'post',
        url: '/api/category/insert',
        data
    })
)

// 更新类别
export const updateCategory = (data: UpdateCategoryParams) => (
    request<UpdateCategoryResult>({
        method: 'post',
        url: '/api/category/updateCategory',
        data
    })
)
