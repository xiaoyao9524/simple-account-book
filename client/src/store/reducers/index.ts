import { combineReducers } from 'redux';

import {
  reducer as userState,
  types as userTypes
} from './modules/user';

import {
  reducer as systemState,
  types as systemTypes
} from './modules/system';

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
  system: systemTypes.ISystemState,
  user: userTypes.IUserState;
}

const reducer = combineReducers<IStoreState>({
  count: counterState,
  todoList: todoListState,
  system: systemState,
  user: userState
});

export default reducer;
