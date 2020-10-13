import {
  SET_TAB_BAR_SHOW, 
  SET_SYSTEM_INFO
} from './actionTypes';

import {
  SetTabbarShowAction,
  SetSystemInfoAction
} from './types';

export const setTabbarShowAction = (show: boolean): SetTabbarShowAction => ({
  type: SET_TAB_BAR_SHOW,
  show
})

export const setSystemInfoAction = (): SetSystemInfoAction => ({
  type: SET_SYSTEM_INFO
})
