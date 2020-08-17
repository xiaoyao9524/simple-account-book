import {
  SET_TAB_BAR_SHOW
} from './actionTypes';

export interface ISystemState {
  isAndroid: boolean;
  isIOS: boolean;
  tabBarShow: boolean;
}

export interface SetTabbarShowAction {
  type: SET_TAB_BAR_SHOW,
  show: boolean;
}
