import {call, put} from 'redux-saga/effects';
import {getRecommendList} from '../../../api/getList';
import {getInitTodoListAction} from './actionCreators';

export function* getinitList (action:any) {
  const res = yield call(getRecommendList, {a: 'hallo'})

  const list = res.data.list.map((i: any) => ({
    title: i.title
  }))

  yield put(getInitTodoListAction(list));
}
