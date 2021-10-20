import { combineReducers } from 'redux';

import {
  reducer as userState,
  types as userTypes
} from './modules/user';

import {
  reducer as systemState,
  types as systemTypes
} from './modules/system';

export interface IStoreState {
  system: systemTypes.ISystemState,
  user: userTypes.IUserState;
}

const reducer = combineReducers<IStoreState>({
  system: systemState,
  user: userState
});

export default reducer;
