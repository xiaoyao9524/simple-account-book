import { takeEvery, all } from 'redux-saga/effects'

import {
  sagas as counterSagas,
  actionTypes as counterActionTypes
} from '../pages/Counter/store';

import {
  sagas as todoListSagas,
  actionTypes as todoListActionTypes
} from '../pages/TodoList/store';

// 用户
import {
  actionCreator as userActionCreator,
  actionTypes as userActionTypes
} from './reducers/modules/user'

// 计数demo
const {incrementAsync} = counterSagas;
const {INCREMENT_ASYNC} = counterActionTypes;

// test
const { TEST_INIT_LIST } = todoListActionTypes;
const {getinitList} = todoListSagas;

// sagas
function* watchInitTodoList() {
  yield takeEvery(TEST_INIT_LIST, getinitList);
}

function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync)
}

function* initSagas () {
  // 更新用户分类
  yield takeEvery(userActionTypes.UPDATE_USER_CATEGORY, userActionCreator.updateUserCategoryAction);
}

// export
export default function* rootSaga () {
  yield all([
    initSagas(),
    watchInitTodoList(),
    watchIncrementAsync()
  ])
}
