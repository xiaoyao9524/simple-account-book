// import { Dispatch } from 'redux';
import {
  SET_USERINFO
} from './actionTypes';

import {UserInfo} from '../../../../types/base';

import {SetUserInfoAction} from './types';

export const getSetUserInfoAction = (userInfo: UserInfo): SetUserInfoAction => ({
  type: SET_USERINFO,
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
