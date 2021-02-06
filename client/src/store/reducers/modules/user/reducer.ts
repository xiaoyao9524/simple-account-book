import UserActions from './actionInterfaces';
import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_USER_DATA_BY_LOCAL,
} from './actionTypes';
import { IUserState } from './types';
import { UserInfo } from '../../../../types/user';
import { CategoryItem } from '../../../../types/category';

const defaultState: IUserState = {
  userInfo: {
    username: '',
    avatar: '',
    category: {
      expenditureIcons: [], // 支出
      incomeIcons: [], // 收入
    }
  },
  token: '',
  
};

export default (state = defaultState, action: UserActions) => {
  let newState = {
    ...state,
  };

  switch (action.type) {
    case SET_USER_INFO:
      newState.userInfo = action.userInfo;
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
      break;
    case SET_TOKEN:
      localStorage.setItem('token', JSON.stringify(action.token));
      newState.token = action.token;
      break;
    case SET_USER_DATA_BY_LOCAL:
      const localUserInfoStr = localStorage.getItem('userInfo');

      try {
        if (localUserInfoStr) {
          const localUserInfo = JSON.parse(localUserInfoStr) as UserInfo;

          newState.userInfo = localUserInfo;

          const localToken = localStorage.getItem('token');
          if (!localToken || !localUserInfo) {
            throw new Error('读取localstorage失败！');
          }
          newState.token = localToken;
        }
      } catch (err) {
        newState = JSON.parse(JSON.stringify(defaultState));
      }
      break;
  }
  return newState;
};
