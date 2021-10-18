import request from '@/utils/axios';
import { 
    GetAllCategoryListResult,
    InsertCategoryProps,
    InsertCategoryResultProps,
    UpdateCategoryParams,
    UpdateCategoryResult,
    GetBillListByCategoryIdResult,
    CheckBillByCategoryId,
    DeleteCategoryParams,
    DeleteCategoryResult,
    UpdateCurrentUserCategoryResult,
    AddCategoryToCurrentRequestParams,
    AddCategoryToCurrentResponseProps,
    DeleteCategoryAndBillResponse
} from "@/types/category";


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

// 删除类别前查找该分类下是否有记账记录
export const getBillListByCategoryId = (data: {
    categoryId: number
}) => (
    request<GetBillListByCategoryIdResult>({
        method: 'post',
        url: '/api/bill/getBillListByCategoryId',
        data
    })
)

// 检查某个分类下有没有记账信息
export const checkBillByCategoryId = (categoryId: number) => (
    request<CheckBillByCategoryId>({
        method: 'post',
        url: '/api/bill/checkBillByCategoryId',
        data: {
            categoryId
        }
    })
)

// 删除分类
export const deleteCategory = (data: DeleteCategoryParams) => (
    request<DeleteCategoryResult>({
        method: 'delete',
        url: '/api/category/deleteCategory',
        data
    })
)

// 将某用户的某分类添加到当前分类中
export const addCategoryToCurrent = (data: AddCategoryToCurrentRequestParams) => (
    request<AddCategoryToCurrentResponseProps>({
        method: 'post',
        url: '/api/category/addCategoryToCurrent',
        data
    })
)

// 更新该用户下现有的分类
export const updateCurrentUserCategory = () => (
    request<UpdateCurrentUserCategoryResult>({
        method: 'post',
        url: '/api/category/getCurrentUserCategory'
    })
)

// 删除类别并删除该类别下的记账信息
export const deleteCategoryAndBill = (id: number) => (
    request<DeleteCategoryAndBillResponse>({
        method: 'post',
        url: '/api/category/deleteCategoryAndBill',
        data: {
            id
        }
    })
)
