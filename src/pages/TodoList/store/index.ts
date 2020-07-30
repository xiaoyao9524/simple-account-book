// import { useDispatch } from 'react-redux';
// import {getRecommendList} from '../../../api/getList';

// actionTypes
const TITLE_CHANGE = 'TITLE_CHANGE';
export type TITLE_CHANGE = typeof TITLE_CHANGE;

const TODOLIST_INIT_LIST = 'TODOLIST_INIT_LIST';
export type TODOLIST_INIT_LIST = typeof TODOLIST_INIT_LIST;
// types


// actionCreators
interface TitleChangeActionProps {
  type: TITLE_CHANGE;
  title: string;
}

export const getTitleChangeAction = (title: string): TitleChangeActionProps => ({
  type: TITLE_CHANGE,
  title
})

export interface TodoItemProps {
  title: string;
}

interface InitTodoListActionProps {
  type: TODOLIST_INIT_LIST;
  list: TodoItemProps[];
}

export const getInitTodoListAction = (list: TodoItemProps[]) => ({
  type: TODOLIST_INIT_LIST,
  list
})

// export const getInitTodoList = () => {
//   return (dispatch) => {

//   }
// }

// store

export type TodoListAction = TitleChangeActionProps | InitTodoListActionProps;

export interface ITodoListItem {
  title: string;
}

export interface TodoListProps {
  title: string;
  list: ITodoListItem[];
}

const defaultState: TodoListProps = {
  title: 'hello world',
  list: []
}

export default (state = defaultState, action: TodoListAction) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case TITLE_CHANGE:
      newState.title = action.title;
      break;
    case TODOLIST_INIT_LIST:
      newState.list = action.list;
      break;
  }
  return newState;
}
