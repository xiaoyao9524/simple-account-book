import React from 'react';

import {
  List,
  InputItem,
  Button,
  Toast
} from 'antd-mobile';

import {
  useHistory
} from 'react-router-dom';

import NavBar from '../../components/NavBar';

import useForm from 'rc-form-hooks';

import {
  SignupRequestProps
} from '../../types/admin';

import { register } from '../../api/admin';
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

  const history = useHistory();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateFields()
      .then((res => {
        console.log('success: ', res);
        // handlerSignup(res);
      }))
      .catch((err: Error) => {
        console.error(err.message);
      })
  }

  async function handlerSignup(userSignupForm: SignupRequestProps) {
    try {
      const res = await register(userSignupForm);

      console.log('res: ', res);

      const {data: {status, message}} = res;

      if (status === 200) {
        history.goBack();
        Toast.fail('注册成功，请登录');
      } else {
        Toast.fail(message);
      }
    } catch (err) {
      console.error(err);

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
            initialValue: 'admin',
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
