import React from 'react';
import { useDispatch } from 'react-redux';

import {
  List,
  InputItem,
  Button,
  Toast
} from 'antd-mobile';

import { useHistory } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';

import NavBar from '../../components/NavBar';

import useForm from 'rc-form-hooks';

import {
  SignupRequestProps
} from '../../types/admin';

import { register } from '../../api/admin';

import {getUserInfo} from '../../api/admin';
import {getSetUserInfoAction} from '../../store/reducers/modules/user/actionCreator';
import './style.scss';
const { Item } = List;

const Register: React.FC = () => {
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    errors,
    values
  } = useForm<SignupRequestProps>();

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateFields()
      .then((res => {
        handlerSignup(res);
      }))
      .catch((err) => {
        Toast.fail(err.message);
      })
  }

  async function handlerSignup(userSignupForm: SignupRequestProps) {
    try {
      const res = await register(userSignupForm);

     const resData = res.data;

      if (resData.status === 200) {
        // history.replace(query.redirect ? decodeURIComponent(query.redirect) : '/');
        requestUserInfo();
        Toast.success('注册成功');
      } else {
        Toast.fail(resData.message);
      }
    } catch (err) {
      console.error(err);
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

        history.replace(decodeURIComponent(query.redirect) || '/');

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

  const validateConfirmPassword = (rule: any, value: string, callback: (err: Error | void) => any) => {
    const confirmPassword = value.trim();

    return callback(confirmPassword !== values.password ? new Error('两次密码输入不一致！') : void 0);
  }

  return (
    <div className="register-wrapper">
      <NavBar>注册</NavBar>

      <form className="register-form">
        <List
          renderHeader="注册"
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
            initialValue: '123456',
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

          {getFieldDecorator('confirmPassword', {
            initialValue: '123456',
            rules: [
              { required: true, message: '请再次输入密码' },
              { validator: validateConfirmPassword }
            ]
          })(
            <InputItem
              type="password"
              clear
              error={getFieldError('password').length > 0}
              onErrorClick={() => {
                alert(getFieldError('password').join('、'));
              }}
              placeholder="请再次输入密码"
            >确认密码</InputItem>
          )}
          <p className={'error'}>{errors.confirmPassword?.map(i => i.message).join('、')}</p>
        </List>
        <Item>
          <Button type="primary" onClick={onSubmit}>注册</Button>
        </Item>
      </form>
    </div>
  )
}

export default Register;
