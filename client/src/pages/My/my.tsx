import React from 'react';
import {useSelector} from 'react-redux';
import {IStoreState} from '../../store/reducers';
import {UserInfo} from '../../types/user';
import {useHistory} from 'react-router-dom';
import defaultAvatar from '../../static/image/default-avatar.jpg';
import NavBar from '../../components/NavBar';
import TabBar from '../../components/TabBar';
import './style.scss';

import {
  List
} from 'antd-mobile';

const { Item } = List;

const My: React.FC = () => {
  const history = useHistory();
  const userInfo = useSelector<IStoreState, UserInfo>(state => state.user.userInfo);
  return (
    <div className="my">
      <NavBar showBack={false}>我的</NavBar>
      <header className="my-header">
        <div 
          className="user-info"
          onClick={() => {
            if (userInfo.username) {
              return
            }
            history.push('/login?redirect=/my');
          }}
        >
          <div className="avatar-wrapper">
            <img className="avatar" src={userInfo.avatar || defaultAvatar} alt="" />
          </div>
          <div className="user-detail">
            <p className="user-name">{userInfo.username || '请登录'}</p>
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
        <Item 
        arrow="horizontal" 
        onClick={() => {
          history.push('/categorySetting')
        }} >类别设置</Item>
        <Item arrow="horizontal">关于简单记账</Item>
      </List>

      <TabBar />
    </div>
  )
}

export default My;
