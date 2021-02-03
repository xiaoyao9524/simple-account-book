import {CategoryItem} from './category';

export interface UserInfo {
  username: string;
  avatar?: string;
  categoryList: CategoryItem[];
}