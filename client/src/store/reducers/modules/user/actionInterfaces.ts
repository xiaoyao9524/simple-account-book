import {SET_USER_INFO, SET_TOKEN} from './actionTypes';
import {UserInfo} from '../../../../types/user';

// 设置token
export interface SetTokenAction {
  type: SET_TOKEN;
  token: string;
}

// 设置用户信息
export interface SetUserInfoAction {
  type: SET_USER_INFO;
  userInfo: UserInfo;
}

 type UserActions = SetTokenAction | SetUserInfoAction;

 export default UserActions;
