import React, {useReducer} from 'react';
import { Button, SwipeAction, List, InputItem } from 'antd-mobile';
import {getRecommendList} from '../../api/getList';
import reducer, {TodoListState} from './reducer';
const initialState: TodoListState = {
  title: '',
  list: []
}

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {title, list} = state;

  return (
    <div className="todo-list">
      <Button
        onClick={() => {
          
        }}
      >获取列表</Button>
      <List className="search-container">
        <InputItem
          onChange={val => {
            console.log(val)
            
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
