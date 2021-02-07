import { BaseResult } from "./base";

// 分类数据结构
export interface CategoryItem {
  readonly id: number;
  categoryType: number; // 收入0 支出 1
  title: string;
  icon: string;
}

// getAllCategoryList 返回
export interface AllCategoryListResult {
  expenditureList: CategoryItem[];
  incomeList: CategoryItem[];
}

export type GetAllCategoryListResult = BaseResult<AllCategoryListResult>;