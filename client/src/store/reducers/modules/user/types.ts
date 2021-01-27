import {UserInfo} from '../../../../types/user';

// user-store
export interface IUserState {
  userInfo: UserInfo;
  token: string | null;
}
