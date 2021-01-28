// import { Dispatch } from 'redux';
import {
  SET_TOKEN,
  SET_USER_INFO,
  SET_USER_DATA_BY_LOCAL,
} from './actionTypes';

import { UserInfo } from '../../../../types/user';

import {
  SetUserInfoAction,
  SetUserDataByLocalStorage,
} from './actionInterfaces';

export const getSetTokenAction = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const getSetUserInfoAction = (
  userInfo: UserInfo
): SetUserInfoAction => ({
  type: SET_USER_INFO,
  userInfo,
});

export const getSetUserDataByLocalAction = (): SetUserDataByLocalStorage => ({
  type: SET_USER_DATA_BY_LOCAL,
});

// redux-saga示例
// export const getUserInfoRequest = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const res = await getUserInfo();

//       dispatch(getSetUserInfoAction(res));
//     } catch (err) {

//     }
//   }
// }
