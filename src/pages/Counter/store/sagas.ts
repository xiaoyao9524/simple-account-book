import { put, delay } from 'redux-saga/effects'
import {INCREMENT} from './actionTypes';

export function* incrementAsync () {
  yield delay(1000);
  yield put({
    type: INCREMENT,
    value: '测试传参'
  })
}
