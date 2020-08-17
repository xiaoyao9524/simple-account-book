import {SET_TAB_BAR_SHOW} from './actionTypes';
import {
  SetTabbarShowAction
} from './types';

export const setTabbarShowAction = (show: boolean): SetTabbarShowAction => ({
  type: SET_TAB_BAR_SHOW,
  show
})
