import { takeEvery, all } from 'redux-saga/effects'

import {
  sagas as counterSagas,
  actionTypes as counterActionTypes
} from '../pages/Counter/store';

import {
  sagas as todoListSagas,
  actionTypes as todoListActionTypes
} from '../pages/TodoList/store';

const {incrementAsync} = counterSagas;
const {INCREMENT_ASYNC} = counterActionTypes;

const { TEST_INIT_LIST } = todoListActionTypes;
const {getinitList} = todoListSagas;

// sagas
function* watchInitTodoList() {
  yield takeEvery(TEST_INIT_LIST, getinitList);
}

function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync)
}

// export
export default function* rootSaga () {
  yield all([
    watchInitTodoList(),
    watchIncrementAsync()
  ])
}
