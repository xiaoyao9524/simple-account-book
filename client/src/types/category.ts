import { BaseResult } from "./base";

// 分类数据结构
export interface CategoryItem {
  readonly id: number;
  categoryType: 0 | 1; // 收入0 支出 1
  isDefault: 0 | 1; // 0为自定义添加，1为默认，无法删除
  title: string;
  icon: string;
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
  expenditureList: CategoryItem[];
  incomeList: CategoryItem[];
}>


// 更新类别传参
export interface UpdateCategoryParams {
  expenditureList: number[];
  incomeList: number[];
}

// 更新类别返回
export interface UpdateCategoryResultData {
  expenditureList: CategoryItem[];
  incomeList: CategoryItem[];
}
export type UpdateCategoryResult = BaseResult<UpdateCategoryResultData>;

/** 删除类别 */
// 删除类别传参
export interface DeleteCategoryParams {
  id: number;
}

export type DeleteCategoryResult = BaseResult<null>;
