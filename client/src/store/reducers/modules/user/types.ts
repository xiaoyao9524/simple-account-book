import {UserInfo} from '../../../../types/base';
import {SET_USERINFO} from './actionTypes';

// actions
export interface SetUserInfoAction {
  type: SET_USERINFO;
  userInfo: UserInfo;
}

export interface IUserState {
  userInfo: UserInfo;
}
