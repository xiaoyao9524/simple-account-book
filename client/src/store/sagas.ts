import { takeEvery, all } from 'redux-saga/effects'

// 用户
import {
  actionCreator as userActionCreator,
  actionTypes as userActionTypes
} from './reducers/modules/user'

function* initSagas () {
  // 更新用户分类
  yield takeEvery(userActionTypes.UPDATE_USER_CATEGORY, userActionCreator.updateUserCategoryAction);
}

// export
export default function* rootSaga () {
  yield all([
    initSagas()
  ])
}
