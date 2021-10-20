import UserActions from './actionInterfaces';
import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_USER_DATA_BY_LOCAL,
  SET_USER_CATEGORY,
  DELETE_ONE_CATEGORY
} from './actionTypes';

import { IUserState } from './types';
import { UserInfo } from '@/types/user';
import { CategoryItemWithSortIndex } from '@/types/category';

const defaultState: IUserState = {
  userInfo: {
    username: '',
    avatar: '',
    bookkeepingDays: 0,
    bookkeepCount: 0,
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
      const { category: {expenditureList, incomeList} } = action.userInfo;
      const newCategory = {
        expenditureList: expenditureList.sort((a, b) => a.sortIndex - b.sortIndex),
        incomeList: incomeList.sort((a, b) => a.sortIndex - b.sortIndex)
      }
      newState.userInfo = {
        ...action.userInfo,
        category:newCategory
      };
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
    case SET_USER_CATEGORY:
      console.log('设置用户分类: ', action.category);
      
      newState.userInfo.category = action.category;
      localStorage.setItem('userInfo', JSON.stringify(newState.userInfo));
      break;
    case DELETE_ONE_CATEGORY:
      const { category } = action;

      let newList: CategoryItemWithSortIndex[] = [];

      const isIncome = category.categoryType === 0;
      if (isIncome) {
        newList = [...newState.userInfo.category.incomeList];
      } else {
        newList = [...newState.userInfo.category.expenditureList];
      }

      const delIndex = newList.findIndex(i => i.id === category.id);

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
