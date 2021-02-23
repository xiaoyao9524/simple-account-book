import React from 'react';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {IStoreState} from '../../store/reducers';
import {UserInfo} from '../../types/user';
import defaultAvatar from '../../static/image/default-avatar.jpg';
import NavBar from '../../components/NavBar';
import TabBar from '../../components/TabBar';
import {
  logout, 
  testReq
} from '../../api/admin';
import './style.scss';

import {
  List,
  Button,
  Toast
} from 'antd-mobile';

const { Item } = List;

const My: React.FC = () => {
  const history = useHistory();
  const userInfo = useSelector<IStoreState, UserInfo>(state => state.user.userInfo);

  const test = async () => {
    const res = await testReq();
    const {data} = res;
    
    console.log('test-data: ', data);
    
  }

  async function _logout () {
    try {
      const res = await logout();

      if (res.data.status === 200) {
        Toast.success('退出成功');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        history.replace('/login');
      } else {
        Toast.fail(res.data.message);
      }
    } catch (err) {
      Toast.fail(err.message);
    }
  }

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
        <Item arrow="horizontal" onClick={test}>关于简单记账</Item>
        <Item>
          <Button onClick={_logout} type="warning">退出登录</Button>
        </Item>
      </List>

      <TabBar />
    </div>
  )
}

export default My;
