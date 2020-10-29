import React from 'react';
import defaultAvatar from '../../static/image/default-avatar.png';
import NavBar from '../../components/NavBar';
import TabBar from '../../components/TabBar';
import './style.scss';

import {
  List
} from 'antd-mobile';

const { Item } = List;

const My: React.FC = () => {
  return (
    <div className="my">
      <NavBar showBack={false}>我的</NavBar>
      <header className="my-header">
        <div className="user-info">
          <div className="avatar-wrapper">
            <img className="avatar" src={defaultAvatar} alt="" />
          </div>
          <div className="user-detail">
            <p className="user-name">XY</p>
          </div>
        </div>
        <div className="account-info">
          <div className="info-item">
            <p className="title">记账总天数</p>
            <p className="number">99999</p>
          </div>
          <div className="info-item">
            <p className="title">记账总笔数</p>
            <p className="number">99999</p>
          </div>
        </div>
      </header>

      <List className="my-list">
        <Item arrow="horizontal">类别设置</Item>
        <Item arrow="horizontal">关于简单记账</Item>
      </List>

      <TabBar />
    </div>
  )
}

export default My;
