import React, {useEffect} from 'react';

import {
  List,
  InputItem,
  Button,
  Toast
} from 'antd-mobile';

import {
  NavLink,
  useHistory,
} from 'react-router-dom';

import useForm from 'rc-form-hooks';

import {
  LoginRequestProps
} from '../../types/admin';

import {
  login,
  getUserInfo
} from '../../api/admin';

import useQuery from '../../hooks/useQuery';

import NavBar from '../../components/NavBar';

import { useDispatch } from 'react-redux';

import {
  actionCreator as userActionCreator
} from '../../store/reducers/modules/user';

import './style.scss';

const { 
  getSetTokenAction, 
  getSetUserInfoAction 
} = userActionCreator;

const Item = List.Item;

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    errors
  } = useForm<LoginRequestProps>();

  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    if (query.failMsg) {
      Toast.fail(decodeURIComponent(query.failMsg), 1, () => {}, false);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateFields()
      .then((res => {
        handlerLogin(res);
      }))
      .catch((err) => {
        Toast.fail(err.message);
      })
  }

  // 获取token
  async function handlerLogin(signinForm: LoginRequestProps) {
    try {
      const loginRes = await login(signinForm);

      const loginData = loginRes.data;

      if (loginData.status === 200) {
        dispatch(getSetTokenAction(loginData.data.token));
        requestUserInfo();
      } else {
        Toast.fail(loginData.message);
      }

    } catch (err) {
      Toast.fail(err.message);
    }
  }

  // 获取用户信息
  async function requestUserInfo() {
    try {
      const userInfoRes = await getUserInfo();
      
      const userInfoData = userInfoRes.data;

      if (userInfoData.status === 200) {
        dispatch(getSetUserInfoAction(userInfoData.data));

        history.replace(query.redirect ? decodeURIComponent(query.redirect) : '/');

      } else {
        Toast.fail(userInfoData.message);
      }

    } catch (err) {
      Toast.fail(err.message);
    }
  }

  const validateUserName = (rule: any, value: string, callback: (err: Error | void) => any) => {
    const userName = value.trim();

    if (!userName) {
      return callback(new Error('用户名不能为空！'));
    }
    if (userName.length < 2) {
      return callback(new Error('用户名至少需要2位！'))
    }
    const reg = /^[^\d]\w{2,12}$/;
    if (!(reg.test(userName))) {
      return callback(new Error('用户名格式不正确！'));
    }
    return callback();
  }

  const validatePassword = (rule: any, value: string, callback: (err: Error | void) => any) => {
    const password = value.trim();
    if (!password) {
      return callback(new Error('必须输入密码！'));
    }
    if (password.length < 6) {
      return callback(new Error('密码至少需要6位！'));
    }

    return callback();
  }

  return (
    <div className="login-wrapper">
      <NavBar>登录</NavBar>
      <form className="login-form">
        <List
          renderHeader="登录"
        >
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [
              { required: true, message: '必须输入用户名!' },
              { validator: validateUserName }
            ]
          })(
            <InputItem
              clear
              error={errors.username && errors.username.length > 0}
              placeholder="请输入用户名"
            >用户名</InputItem>
          )}
          <p className={'error'}>{errors.username?.map(i => i.message).join('、')}</p>

          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              { required: true, message: '请输入密码' },
              { validator: validatePassword }
            ]
          })(
            <InputItem
              type="password"
              clear
              error={getFieldError('password').length > 0}
              placeholder="请输入密码"
            >密码</InputItem>
          )}
          <p className={'error'}>{errors.password?.map(i => i.message).join('、')}</p>
        </List>

        <Item>
          <Button type="primary" onClick={onSubmit}>登录</Button>
        </Item>

        <Item className="">
          <NavLink to={`/register?redirect=${query.redirect || '/'}`} style={{ float: 'right', color: '#108ee9' }}>
            注册
          </NavLink>
        </Item>
      </form>
    </div>
  )
}

export default Login;
