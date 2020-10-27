import React from 'react';

import {
  List,
  InputItem,
  Button,
  Toast
} from 'antd-mobile';

import {
  NavLink,
  useHistory,
  useLocation
} from 'react-router-dom';

import {
  SigninRequestProps
} from '../../types/login';

import {
  signin,
  requestUserInfo
} from '../../api/login';

import NavBar from '../../components/NavBar';
import useForm from 'rc-form-hooks';
import { useDispatch } from 'react-redux';

import {
  actionCreator as userActionCreator
} from '../../store/reducers/modules/user';

const {getSetUserInfoAction} = userActionCreator;

const Item = List.Item;

interface LocationProps {
  redirect?: string;
}

const Login: React.FC = () => {
  
  const dispatch = useDispatch();
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    errors
  } = useForm<SigninRequestProps>();
  const history = useHistory();
  const location = useLocation<LocationProps>();
  const redirect = location.state.redirect;
  console.log('redirect: ', redirect);
  
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateFields()
      .then((res => {
        console.log('success: ', res);
        handlerSignup(res);
      }))
      .catch((err: Error) => {
        console.error(err.message);
      })
  }
  // 获取token
  async function handlerSignup (signinForm: SigninRequestProps) {
    try {
      const {data: {status, message, token}} = await signin(signinForm);
      
      if(status === 200 && token) {
        localStorage.setItem('token', token);
        getUserInfo();
      } else {
        Toast.fail(message);
      }

    } catch (err) {
      Toast.fail(err.message);
    }
  }

  // 获取用户信息
  async function getUserInfo () {
    try {
      const res = await requestUserInfo();
      console.log('获取用户信息res：', res);
      
      const {data: {status, message, userInfo}} = res;

      if (status === 200) {
        const action = getSetUserInfoAction(userInfo);

        dispatch(action);



      } else {
        Toast.fail(message);
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
              onErrorClick={() => {
                alert(getFieldError('username').map(i => i.message).join('、'));
              }}
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
              onErrorClick={() => {
                alert(getFieldError('password').join('、'));
              }}
              placeholder="请输入密码"
            >密码</InputItem>
          )}
          <p className={'error'}>{errors.password?.map(i => i.message).join('、')}</p>
        </List>

        <Item>
          <Button type="primary" onClick={onSubmit}>登录</Button>
        </Item>

        <Item>
          <NavLink to="/signup" style={{ float: 'right', color: '#108ee9' }}>
            注册
          </NavLink>
        </Item>
      </form>
    </div>
  )
}

export default Login;
