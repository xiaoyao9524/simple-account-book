import {
  SET_USERINFO
} from './actionTypes';

import { UserInfo } from '../../../../types/base';

import {
  SetUserInfoAction
} from './types';

type actionTypeProps = SetUserInfoAction;

export interface UserState {
  userInfo: UserInfo;
}

const defaultState: UserState = {
  userInfo: {
    id: -1,
    username: ''
  }
}

export default (state = defaultState, action: actionTypeProps) => {
  const newState = JSON.parse(JSON.stringify(defaultState));

  switch (action.type) {
    case SET_USERINFO:
      console.log('设置用户信息：', action.userInfo);
      
      newState.userInfo = action.userInfo;
      break;
  }
  return newState;
}