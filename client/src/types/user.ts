import {CategoryItem} from './category';

export interface UserInfo {
  username: string;
  avatar?: string;
  category: {
    expenditureIcons: CategoryItem[];
    incomeIcons: CategoryItem[];
  };
}