// import { Dispatch } from 'redux';
import {
  SET_TOKEN,
  SET_USER_INFO
} from './actionTypes';

import {UserInfo} from '../../../../types/user';

import {SetUserInfoAction} from './actionInterfaces';

export const getSetTokenAction = (token: string) => ({
  type: SET_TOKEN,
  token
})

export const getSetUserInfoAction = (userInfo: UserInfo): SetUserInfoAction => ({
  type: SET_USER_INFO,
   userInfo
})

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
