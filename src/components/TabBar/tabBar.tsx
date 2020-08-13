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
    icon: 'wode2',
    title: '我的',
    to: '/my'
  }
];

const tabs = tabBarList.map(tab => (
  <li className="tab-item" key={tab.title}>
    <NavLink exact className="tab-link-wrapper" to={tab.to}>
      <div className="icon-row">
        <span
          className={`icon iconfont icon-${tab.icon} `}
          style={tab.iconStyle ? tab.iconStyle : undefined}
        ></span>
      </div>
      <p className="tab-title">{tab.title}</p>
    </NavLink>
  </li>
));

const TabBar = () => {
  const isIOS = useSelector<IStoreState>(state => state.system.isIOS);
  
  return (
    <ul className={`tab-bar ${isIOS ? 'is-ios' : ''}`}>
      {tabs}
    </ul>
  )
}

export default TabBar;
