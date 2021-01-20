import React from 'react'
import { useSelector } from 'react-redux';

import { IStoreState } from '../../store/reducers/index'
import {
  NavLink
} from 'react-router-dom';

const tabBarList = [
  {
    icon: 'mingxi',
    title: '明细',
    to: '/'
  },
  {
    icon: 'plus',
    title: '记账',
    iconStyle: {
      fontWeight: 600
    },
    to: '/bookkeeping'
  },
  {
    icon: 'wode',
    title: '我的',
    to: '/my'
  }
];

const tabs = tabBarList.map(tab => (
  <li className="tab-item" key={tab.title}>
    <NavLink exact className="tab-link-wrapper" to={tab.to}>
      <div className="icon-row">
        <span
          className={`icon iconfont-base icon-${tab.icon} `}
          style={tab.iconStyle ? tab.iconStyle : undefined}
        ></span>
      </div>
      <p className="tab-title">{tab.title}</p>
    </NavLink>
  </li>
));

const TabBar = () => {
  const tabBarShow = useSelector<IStoreState>(state => state.system.tabBarShow);
  const isIOS = useSelector<IStoreState>(state => state.system.isIOS);


  return (
    <>
      {tabBarShow ? (
        <ul className={`tab-bar ${isIOS ? 'is-ios' : ''}`} >
          {tabs}
        </ul >
      ) : null}
    </>
  )
}

export default TabBar;
