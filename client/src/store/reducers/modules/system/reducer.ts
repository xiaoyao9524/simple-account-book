import {
  ISystemState, 
  SetTabbarShowAction, 
  SetSystemInfoAction
} from './types';
import {
  SET_TAB_BAR_SHOW, 
  SET_SYSTEM_INFO
} from './actionTypes';

import {
  checkSystemInfo
} from '@/utils/system';

type actionTypes = SetTabbarShowAction | SetSystemInfoAction;

const defaultState: ISystemState = {
  isMobile: false, // 设备是否为移动端
  isAndroid: false,
  isIOS: false,
  tabBarShow: true
}

export default (state = defaultState, action: actionTypes) => {
  const newState: ISystemState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case SET_TAB_BAR_SHOW:
      newState.tabBarShow = action.show;
      break;
    case SET_SYSTEM_INFO:
      const {isIOS, isAndroid, isMobile} =  checkSystemInfo();
      newState.isAndroid = isAndroid;
      newState.isIOS = isIOS;
      newState.isMobile = isMobile;
      break;
    default:
      return newState;
  }
  return newState;
}
