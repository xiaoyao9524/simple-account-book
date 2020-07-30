import {
  SET_USERINFO
} from './actionTypes';

import {
  UserInfoProps,
  SetUserInfoAction
} from './types';

type actionTypeProps = SetUserInfoAction;

export interface UserState {
  userInfo: UserInfoProps;
}

const defaultState: UserState = {
  userInfo: {
    id: -1,
  name: ''
  }
}

export default (state = defaultState, action: actionTypeProps) => {
  const newState = JSON.parse(JSON.stringify(defaultState));

  switch (action.type) {
    case SET_USERINFO:
      newState.userInfo = action.userInfo;
      break;
  }
  return newState;
}