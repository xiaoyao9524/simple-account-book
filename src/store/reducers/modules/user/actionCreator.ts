import { Dispatch } from 'redux';
import {
  SET_USERINFO
} from './actionTypes';
import {getUserInfo} from '../../../../api/userInfo'

import {
  UserInfoProps,
  SetUserInfoAction
} from './types';

export const getSetUserInfoAction = (userInfo:UserInfoProps):SetUserInfoAction => ({
  type: SET_USERINFO,
  userInfo
});

export const getUserInfoRequest = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getUserInfo();

      dispatch(getSetUserInfoAction(res));
    } catch (err) {

    }
  }
}
