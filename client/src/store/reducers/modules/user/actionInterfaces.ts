import {
  SET_USER_INFO,
  SET_TOKEN,
  SET_USER_DATA_BY_LOCAL,
  UPDATE_USER_CATEGORY,
  DELETE_ONE_CATEGORY
} from './actionTypes';

import { UserInfo } from '../../../../types/user';
import { UpdateCategoryResultData, CategoryItem } from '../../../../types/category';

// 设置token
export interface SetTokenAction {
  type: SET_TOKEN;
  token: string;
}

// 设置用户信息
export interface SetUserInfoAction {
  type: SET_USER_INFO;
  userInfo: UserInfo;
}

// 从localstorage中读取用户信息和token
export interface SetUserDataByLocalStorage {
  type: SET_USER_DATA_BY_LOCAL;
}

export interface UpdateUserCategoryAction {
  type: UPDATE_USER_CATEGORY;
  category: UpdateCategoryResultData;
}

export interface DeleteOneCategoryAction {
  type: DELETE_ONE_CATEGORY;
  category: CategoryItem;
}

type UserActions =
  | SetTokenAction
  | SetUserInfoAction
  | SetUserDataByLocalStorage
  | UpdateUserCategoryAction
  | DeleteOneCategoryAction;

export default UserActions;
