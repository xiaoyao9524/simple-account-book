import {
  TODOLIST_TITLE_CHANGE,
  TODOLIST_INIT_LIST
} from './actionTypes';

import {
  ITodoListTitleChangeAction,
  ITodoItemProps
} from './types';

export const getTitleChangeAction = (title: string): ITodoListTitleChangeAction => ({
  type: TODOLIST_TITLE_CHANGE,
  title
});

export const getInitTodoListAction = (list: ITodoItemProps[]) => ({
  type: TODOLIST_INIT_LIST,
  list
})
