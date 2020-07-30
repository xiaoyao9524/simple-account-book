import { put, takeEvery, delay } from 'redux-saga/effects'
import axios from 'axios';
import {getInitTodoListAction} from '../pages/TodoList/store';

export function* helloSaga() {
  console.log('Hello Sagas!');
  yield takeEvery('TEST_INIT_LIST', getinitList);
}

function* getinitList () {
  const res = yield axios({
    method: 'get',
    url: '/index/recommend.json'
  })

  console.log(res);

  const list = res.data.list.map((i: any) => ({
    title: i.title
  }))

  yield put(getInitTodoListAction(list));
}

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
