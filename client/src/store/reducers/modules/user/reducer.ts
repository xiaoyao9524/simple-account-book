import UserActions from './actionInterfaces';
import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_USER_DATA_BY_LOCAL,
  UPDATE_USER_CATEGORY,
  DELETE_ONE_CATEGORY
} from './actionTypes';

import { IUserState } from './types';
import { UserInfo } from '../../../../types/user';
import { CategoryItem } from '../../../../types/category';

const defaultState: IUserState = {
  userInfo: {
    username: '',
    avatar: '',
    category: {
      expenditureList: [], // 支出
      incomeList: [], // 收入
    }
  },
  token: ''
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
      break
    case UPDATE_USER_CATEGORY:
      newState.userInfo.category = action.category;
      localStorage.setItem('userInfo', JSON.stringify(newState.userInfo));
      break
    case DELETE_ONE_CATEGORY:
      const { category } = action;

      let newList: CategoryItem[] = [];

      const isIncome = category.categoryType === 0;
      if (isIncome) {
        newList = [...newState.userInfo.category.incomeList];
      } else {
        newList = [...newState.userInfo.category.expenditureList];
      }

      const delIndex = newList.findIndex(i => i.id === category.id);
      console.log('delIndex: ', delIndex);

      if (delIndex >= 0) {
        newList.splice(delIndex, 1);
      }

      if (isIncome) {
        newState.userInfo.category.incomeList = newList;
      } else {
        newState.userInfo.category.expenditureList = newList;
      }
      localStorage.setItem('userInfo', JSON.stringify(newState.userInfo));
      
      break
  }
  return newState;
};
