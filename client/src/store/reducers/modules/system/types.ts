import {
  SET_TAB_BAR_SHOW,
  SET_SYSTEM_INFO
} from './actionTypes';

export interface ISystemState {
  isMobile: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  tabBarShow: boolean;
}

// tabbar是否显示
export interface SetTabbarShowAction {
  type: SET_TAB_BAR_SHOW;
  show: boolean;
}

// 设置设备系统信息
export interface SetSystemInfoAction {
  type: SET_SYSTEM_INFO;
}
