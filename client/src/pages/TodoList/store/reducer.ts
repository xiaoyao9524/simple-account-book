import {
  TODOLIST_TITLE_CHANGE,
  TODOLIST_INIT_LIST
} from './actionTypes';

import {
  TodoListActions,
  ITodoListState
} from './types';

const defaultState: ITodoListState = {
  title: 'hello world',
  list: []
}

export default (state = defaultState, action: TodoListActions) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TODOLIST_TITLE_CHANGE:
      newState.title = action.title;
      break;
    case TODOLIST_INIT_LIST:
      newState.list = action.list;
      break;
  }
  return newState;
}
