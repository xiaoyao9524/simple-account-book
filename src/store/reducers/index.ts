import { combineReducers } from 'redux';

// import about, {AboutState} from '../pages/About/reducer';
// import home, {HomeState} from '../pages/Home/reducer';
// import todoList, {TodoListState} from '../pages/TodoList/reducer';
import user, {UserState} from './modules/user';
import count, {CounterProps} from '../../pages/Counter/store';
import todoList, {TodoListProps} from '../../pages/TodoList/store';
export interface StoreState {
  // about: AboutState;
  // home: HomeState;
  count: CounterProps;
  todoList: TodoListProps;
  user: UserState;
}

const reducer = combineReducers<StoreState>({
  // about,
  // home,
  count,
  todoList,
  user
});

export default reducer;
