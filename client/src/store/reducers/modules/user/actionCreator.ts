// import { Dispatch } from 'redux';
import {
  SET_TOKEN,
  SET_USER_INFO,
  SET_USER_DATA_BY_LOCAL,
  UPDATE_USER_CATEGORY,
  DELETE_ONE_CATEGORY
} from './actionTypes';

import { UserInfo } from '../../../../types/user';
import { UpdateCategoryResultData, CategoryItem } from "../../../../types/category";

import {
  SetUserInfoAction,
  SetUserDataByLocalStorage,
  DeleteOneCategoryAction
} from './actionInterfaces';

export const getSetTokenAction = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const getSetUserInfoAction = (
  userInfo: UserInfo
): SetUserInfoAction => ({
  type: SET_USER_INFO,
  userInfo,
});

export const getSetUserDataByLocalAction = (): SetUserDataByLocalStorage => ({
  type: SET_USER_DATA_BY_LOCAL,
});

export const getUpdateUserCategoryAction = (category: UpdateCategoryResultData) => ({
  type: UPDATE_USER_CATEGORY,
  category
})

export const getDeleteOneCtegoryAction = (category: CategoryItem): DeleteOneCategoryAction => ({
  type: DELETE_ONE_CATEGORY,
  category
})

// redux-saga示例
// export const getUserInfoRequest = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const res = await getUserInfo();

//       dispatch(getSetUserInfoAction(res));
//     } catch (err) {

//     }
//   }
// }
