import {
  INCREMENT,
  DECREMENT
} from './actionTypes';

// action
export interface IIncrementAction {
  type: INCREMENT
}

export interface IDecrementAction {
  type: DECREMENT
}

export type CounterAction = 
IIncrementAction | 
IDecrementAction;

// state
export interface ICounterState {
  count: number
}
