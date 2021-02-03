import UserActions from './actionInterfaces';
import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_USER_DATA_BY_LOCAL,
} from './actionTypes';
import { IUserState } from './types';
import { UserInfo } from '../../../../types/user';
import { CategoryItem } from '../../../../types/category';

function transformUserInfo(state: IUserState, userInfo: UserInfo) {
  // 支出
  const expenditureIcons: CategoryItem[] = [];
  // 收入
  const incomeIcons: CategoryItem[] = [];

  for (let item of userInfo.categoryList) {
    if (item.categoryType === 0) {
      incomeIcons.push(item);
    } else {
      expenditureIcons.push(item);
    }
  }

  return {
    ...state,
    userInfo,
    expenditureIcons,
    incomeIcons,
  };
}

const defaultState: IUserState = {
  userInfo: {
    username: '',
    avatar: '',
    categoryList: [],
  },
  token: null,
  expenditureIcons: [], // 支出
  incomeIcons: [], // 收入
};

export default (state = defaultState, action: UserActions) => {
  let newState = {
    ...state,
  };

  switch (action.type) {
    case SET_USER_INFO:
      const newStateInfo = transformUserInfo(newState, action.userInfo);
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo));

      newState = {
        ...newStateInfo,
      };
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

          const newStateInfo = transformUserInfo(newState, localUserInfo);

          const localToken = localStorage.getItem('token');
          if (!localToken || !localUserInfo) {
            throw new Error('读取localstorage失败！');
          }
          newStateInfo.token = localToken;

          newState = newStateInfo;
        }
      } catch (err) {
        newState = JSON.parse(JSON.stringify(defaultState));
      }
      break;
  }
  return newState;
};
