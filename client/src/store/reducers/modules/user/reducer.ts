import UserActions from './actionInterfaces';
import { 
  SET_USER_INFO,
  SET_TOKEN,
  SET_USER_DATA_BY_LOCAL
} from './actionTypes';
import {IUserState} from './types';
import {UserInfo} from '../../../../types/user';

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
      localStorage.setItem('token', JSON.stringify(action.token));
      newState.token = action.token;
      break;
    case SET_USER_DATA_BY_LOCAL:
      console.group('从localstorage中读取数据');
      
      const localUserInfoStr = localStorage.getItem('userInfo');
      console.log('localUserInfoStr: ', localUserInfoStr);

      try {
        if (localUserInfoStr) {
          const localUserInfo = JSON.parse(localUserInfoStr) as UserInfo;

          newState.userInfo = localUserInfo;
        }
      } catch (err) {
        console.error('读取localstorage')
      }
      
      const localToken = localStorage.getItem('token');
      console.log('localToken: ', localToken);
      
      console.groupEnd();
      break;
  }
  return newState;
};
