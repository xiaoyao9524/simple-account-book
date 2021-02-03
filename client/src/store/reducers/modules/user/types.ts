import {UserInfo} from '../../../../types/user';
import {CategoryItem} from '../../../../types/category';

// user-store
export interface IUserState {
  userInfo: UserInfo;
  token: string | null;
  expenditureIcons: CategoryItem[];
  incomeIcons: CategoryItem[];
}
