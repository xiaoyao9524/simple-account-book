import {CategoryItem} from './category';

export interface UserInfo {
  username: string;
  avatar?: string;
  bookkeepingDays: number;
  category: {
    expenditureList: CategoryItem[];
    incomeList: CategoryItem[];
  };
}