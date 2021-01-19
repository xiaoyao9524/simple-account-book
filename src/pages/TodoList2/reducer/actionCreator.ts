import {
  INIT_LIST,
  INSERT_TODO_ITEM,
  DELETE_TODO_ITEM,
  UPDATE_TITLE,
} from './actionTypes';

// 初始化列表
interface InitTodoListActionProps {
  type: INIT_LIST;
  title: string;
}

export const getInitTodoListAction = (
  title: string
): InitTodoListActionProps => {
  return {
    type: INIT_LIST,
    title,
  };
};

// 新增数据
interface InsertTodoItemActionProps {
  type: INSERT_TODO_ITEM;
  title: string;
}

export type TodoListActions = InitTodoListActionProps | InsertTodoItemActionProps;
