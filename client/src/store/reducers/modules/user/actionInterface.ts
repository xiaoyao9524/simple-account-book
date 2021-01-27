import {SET_USER_INFO} from './actionTypes';
import {UserInfo} from '../../../../types/base';

// actions
export interface SetUserInfoAction {
  type: SET_USER_INFO;
  userInfo: UserInfo;
}


