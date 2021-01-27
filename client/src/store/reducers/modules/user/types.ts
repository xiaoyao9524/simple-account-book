import {UserInfo} from '../../../../types/base';

// user-store
export interface IUserState {
  userInfo: UserInfo;
  token: string | null;
}
