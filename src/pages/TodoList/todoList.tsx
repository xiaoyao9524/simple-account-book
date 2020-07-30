import React from 'react';
import { Button, SwipeAction, List, InputItem } from 'antd-mobile';
import { StoreState } from '../../store/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { getTitleChangeAction, TodoItemProps } from './store';
// import { getRecommendList } from '../../api/getList';

const TodoList = () => {
  const title = useSelector<StoreState, string>(state => state.todoList.title);
  const list = useSelector<StoreState, TodoItemProps[]>(state => state.todoList.list);
  console.log('title: ', title)
  const dispatch = useDispatch();


  return (
    <div className="todo-list">
      <Button
        onClick={() => {
          dispatch({
            type: 'TEST_INIT_LIST'
          })
        }}
      >获取列表</Button>
      <List className="search-container">
        <InputItem
          onChange={val => {
            console.log(val)
            dispatch(getTitleChangeAction(val));
          }}
          value={title}
        >请输入：</InputItem>

        {list.map((item, index) => (
          <SwipeAction
            key={index}
            autoClose
            right={[
              {
                text: '删除',
                onPress: () => {
                  console.log('delete: ', item)
                }
              }
            ]}
          >
            <List.Item
              onClick={e => console.log(item.title)}
            >
              {item.title}
            </List.Item>
          </SwipeAction>
        ))}
      </List>
    </div>
  )
}

export default TodoList;
