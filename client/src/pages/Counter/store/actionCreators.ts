import {
  INCREMENT,
  DECREMENT
} from './actionTypes';

import {
  IIncrementAction,
  IDecrementAction
} from './types';

// action
export const getIncrementAction = (): IIncrementAction => ({
  type: INCREMENT
})

export const getDecrementAction = (): IDecrementAction => ({
  type: DECREMENT
})


