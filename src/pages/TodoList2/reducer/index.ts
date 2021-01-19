import {
  INIT_LIST
} from './actionTypes';

import {
  TodoListActions
} from './actionCreator'

interface TodoItem {
  title: string;
}

export interface TodoListState {
  title: string;
  list: TodoItem[];
}

function reducer (state: TodoListState, action: TodoListActions) {
  switch (action.type) {
    case INIT_LIST:
      return {
        ...state,
        list: [...state.list, {title: action.title}]
      }
    default:
      throw new Error();
  }
}

export default reducer;
