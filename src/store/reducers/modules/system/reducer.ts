import {ISystemState, SetTabbarShowAction} from './types';
import {SET_TAB_BAR_SHOW} from './actionTypes';

type actionTypes = SetTabbarShowAction;

const u = navigator.userAgent;

const defaultState: ISystemState = {
  isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
  isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  tabBarShow: true
}

export default (state = defaultState, action: actionTypes) => {
  const newState: ISystemState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case SET_TAB_BAR_SHOW:
      newState.tabBarShow = action.show;
      return newState;
  }
  return newState;
}
