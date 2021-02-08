import {CategoryItem} from './category';

export interface UserInfo {
  username: string;
  avatar?: string;
  category: {
    expenditureList: CategoryItem[];
    incomeList: CategoryItem[];
  };
}