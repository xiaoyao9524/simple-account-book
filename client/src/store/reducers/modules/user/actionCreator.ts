import { put, call } from 'redux-saga/effects';
import {
   Toast
} from 'antd-mobile';
import { Dispatch } from 'redux';
import {
  SET_TOKEN,
  SET_USER_INFO,
  SET_USER_DATA_BY_LOCAL,
  SET_USER_CATEGORY,
  UPDATE_USER_CATEGORY,
  DELETE_ONE_CATEGORY
} from './actionTypes';

// request
import { updateCurrentUserCategory } from '../../../../api/category';

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

// export const getUpdateUserCategoryAction = (category: UpdateCategoryResultData) => ({
//   type: UPDATE_USER_CATEGORY,
//   category
// })

export const getDeleteOneCtegoryAction = (category: CategoryItem): DeleteOneCategoryAction => ({
  type: DELETE_ONE_CATEGORY,
  category
})

export const getSetUserCategoryAction = (category: UpdateCategoryResultData) => ({
  type: SET_USER_CATEGORY,
  category
})

// 更新用户category
export function* updateUserCategoryAction (t: any)  {
  console.log('测试saga传参: ', t);
  try {
    const res = yield call(updateCurrentUserCategory);

    console.log('res-xxxxxxxxxxx: ', res);
    

    if (res.data.status === 200) {
      console.log('更新用户category-dispatch: ', res.data.data);
      // dispatch(getSetUserCategoryAction(res.data.data));
      yield put(getSetUserCategoryAction(res.data.data));
    } else {
      Toast.fail(res.data.message);
    }
  } catch (err) {
    console.error(err);
    Toast.fail(err.message);
  }
  /*
  return async (dispatch: Dispatch) => {
    try {
      const res = await updateCurrentUserCategory();

      if (res.data.status === 200) {
        console.log('更新用户category-dispatch: ', res.data.data);
        dispatch(getSetUserCategoryAction(res.data.data));
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      console.error(err);
      Toast.fail(err.message);
    }
    */
  // }
}

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
