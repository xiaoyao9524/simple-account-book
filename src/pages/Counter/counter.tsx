import React from 'react';
import { StoreState } from '../../store/reducers';

import { useSelector, useDispatch } from 'react-redux';

const Counter: React.FC = () => {
  const count = useSelector<StoreState, number>(state => state.count.count);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => (
        dispatch({ type: 'INCREMENT_ASYNC' })
      )}>
        Increment after 1 second
    </button>
      {' '}
      <button onClick={() => (
        dispatch({
          type: 'INCREMENT'
        })
      )}>
        Increment
    </button>
      {' '}
      <button onClick={() => {
        dispatch({
          type: 'DECREMENT'
        })
      }}>
        Decrement
    </button>
      <hr />
      <div>
        Clicked: {count} times
    </div>
    </div>
  )
}

export default Counter;
