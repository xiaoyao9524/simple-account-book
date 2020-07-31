import { combineReducers } from 'redux';

import user, {UserState} from './modules/user';

import {
  reducer as counterState,
  types as counterTypes
} from '../../pages/Counter/store';


import {
  reducer as todoListState,
  types as todoListTypes
} from '../../pages/TodoList/store';

export interface IStoreState {
  count: counterTypes.ICounterState;
  todoList: todoListTypes.ITodoListState;
  user: UserState;
}

const reducer = combineReducers<IStoreState>({
  count: counterState,
  todoList: todoListState,
  user
});

export default reducer;
