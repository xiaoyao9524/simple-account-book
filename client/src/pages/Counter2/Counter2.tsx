import React, { FC, useReducer } from 'react'
import {Button} from 'antd-mobile';

import reducer, {CounterState} from './reducer';

const initialState: CounterState = {count: 0};

const Counter2:FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="">
      <Button
        onClick={() => {
          dispatch({
            type: 'decreemnt'
          })
        }}
      >-1</Button>
      <p>{state.count}</p>
      <Button
        onClick={() => {
          dispatch({
            type: 'increment'
          })
        }}
      >+1</Button>
    </div>
  )
};

export default Counter2;
