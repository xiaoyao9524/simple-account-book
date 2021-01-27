import { SET_USER_INFO, SET_TOKEN } from './actionTypes';

import { UserInfo } from '../../../../types/base';

import { SetUserInfoAction } from './actionInterface';

type actionTypeProps = SetUserInfoAction;



const defaultState: UserState = {
  userInfo: {
    username: '',
    avatar: ''
  },
  token: null
};

export default (state = defaultState, action: actionTypeProps) => {
  const newState = {
    ...state
  };

  switch (action.type) {
    case SET_USER_INFO:
      newState.userInfo = action.userInfo;
      break;
    case SET_TOKEN:
      newState.token = action.token;
  }
  return newState;
};
