import {ISystemState} from './types';

const u = navigator.userAgent;

const defaultState: ISystemState = {
  isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
  isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
}

export default (state = defaultState) => {
  return state;
}
