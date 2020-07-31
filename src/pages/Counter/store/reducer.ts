import {
  CounterAction, 
  ICounterState
} from './types';

import {
  INCREMENT,
  DECREMENT
} from './actionTypes';

const defaultState: ICounterState = {
  count: 0
}

export default (state = defaultState, action: CounterAction) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case INCREMENT:
      newState.count++;
      break;
    case DECREMENT:
      newState.count--;
      break;
  }
  return newState;
}