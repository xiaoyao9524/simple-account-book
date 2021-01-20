import {
  TODOLIST_TITLE_CHANGE,
  TODOLIST_INIT_LIST
} from './actionTypes';

// action
export interface ITodoListInitListAction {
  type: TODOLIST_INIT_LIST;
  list: ITodoItemProps[];
}

export interface ITodoListTitleChangeAction {
  type: TODOLIST_TITLE_CHANGE;
  title: string;
}

export type TodoListActions =
ITodoListInitListAction |
ITodoListTitleChangeAction;

// props
export interface ITodoItemProps {
  title: string;
}

// state
export interface ITodoListState {
  title: string;
  list: ITodoItemProps[]
}
