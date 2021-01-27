import UserActions from './actionInterfaces';
import { 
  SET_USER_INFO,
  SET_TOKEN
} from './actionTypes';
import {IUserState} from './types';

const defaultState: IUserState = {
  userInfo: {
    username: '',
    avatar: ''
  },
  token: null
};

export default (state = defaultState, action: UserActions) => {
  const newState = {
    ...state
  };

  switch (action.type) {
    case SET_USER_INFO:
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
      newState.userInfo = action.userInfo;
      break;
    case SET_TOKEN:
      newState.token = action.token;
      break;
  }
  return newState;
};
