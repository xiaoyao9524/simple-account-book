import React, { FC, useState, useEffect } from 'react'
import {Button} from 'antd-mobile';
import {useHistory, useLocation} from 'react-router-dom';

const NoLogin:FC = () => {
  const history = useHistory();
  const location = useLocation();
  const goLogin = () => {
    history.push(`/login?redirect=${encodeURIComponent(location.pathname)}`)
  }
  return (
    <div className="no-login">
      <p>您还未登录</p>
      <Button onClick={goLogin}>去登录</Button>
    </div>
  )
};

export default NoLogin;