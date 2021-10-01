import { BaseResult } from "./base";
import { BillItem } from './bill';

// 分类数据结构
export interface CategoryItem {
  readonly id: number;
  categoryType: 0 | 1; // 收入0 支出 1
  isDefault: 0 | 1; // 0为自定义添加，1为默认，无法删除
  title: string;
  icon: string;
}

export interface CategoryItemWithSortIndex extends CategoryItem {
  sortIndex: number; // 越小越靠前
}

// getAllCategoryList 返回
export interface AllCategoryListResult {
  expenditureList: CategoryItem[];
  incomeList: CategoryItem[];
}

export type GetAllCategoryListResult = BaseResult<AllCategoryListResult>;

/** 新增类别 */
// 传参
export interface InsertCategoryProps {
  categoryType: 0 | 1;
  title: string;
  icon: string;
}

// 返回
export type InsertCategoryResultProps = BaseResult<{
  expenditureList: CategoryItemWithSortIndex[];
  incomeList: CategoryItemWithSortIndex[];
}>


// 更新类别传参
export interface UpdateCategoryParams {
  expenditureList: number[];
  incomeList: number[];
}

// 更新类别返回
export interface UpdateCategoryResultData {
  expenditureList: CategoryItemWithSortIndex[];
  incomeList: CategoryItemWithSortIndex[];
}
export type UpdateCategoryResult = BaseResult<UpdateCategoryResultData>;

// 删除分类前获取该分类下记账记录接口返回
export type GetBillListByCategoryIdResult = BaseResult<{
  billList: BillItem[];
}>;

// 检查某个分类下是否有记账信息接口返回
export type CheckBillByCategoryId = BaseResult<{
  existBill: boolean;
}>;

/** 删除类别 */
// 删除类别传参
export interface DeleteCategoryParams {
  id: number;
}

export type DeleteCategoryResult = BaseResult<null>;

// 更新该用户下现有分类接口返回
export type UpdateCurrentUserCategoryResult = BaseResult<{
  expenditureList: CategoryItemWithSortIndex[],
  incomeList: CategoryItemWithSortIndex[]
}>;

// 将某用户的某分类添加到当前分类中接口 请求参数
export interface AddCategoryToCurrentRequestParams {
  categoryId: number;
}

// 将某用户的某分类添加到当前分类中接口 返回参数
export type AddCategoryToCurrentResponseProps = BaseResult<boolean>;

// 删除类别并删除该类别下的记账信息 接口返回
export type DeleteCategoryAndBillResponse = BaseResult<boolean>;