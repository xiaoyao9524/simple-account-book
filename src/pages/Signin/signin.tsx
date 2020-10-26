import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  List,
  InputItem,
  Button,
} from 'antd-mobile';
import {
  NavLink
} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import useForm from 'rc-form-hooks';
// import { setTabbarShowAction } from '../../store/reducers/modules/system/actionCreators';

const Item = List.Item;

interface ILoginProps {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setTabbarShowAction(false));
  //   return () => {
  //     dispatch(setTabbarShowAction(true));
  //   }
  // })
  const {
    getFieldDecorator,
    getFieldError,
    validateFields,
    errors,
    // eslint-disable-next-line
    values
  } = useForm<ILoginProps>();


  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateFields()
      .then((res => {
        console.log('success: ', res);
      }))
      .catch((err: Error) => {
        console.error(err.message);
      })
  }

  const validateAccount = (rule: any, value: string, callback: (err: Error | void) => any) => {
    const val = value.trim();
    if (!val) {
      return callback(new Error('用户名不能为空！'));
    }
    return callback(value.length < 6 ? new Error('用户名至少要六位！') : void 0)
  }

  const validatePassword = (rule: any, value: string, callback: (err: Error | void) => any) => {
    return callback(value.length < 6 ? new Error('密码至少要六位') : void 0)
  }

  return (
    <div className="login-wrapper">
      <NavBar>登录</NavBar>
      <form className="login-form" onSubmit={onSubmit}>
        <List
          renderHeader="登录"
        >
          {getFieldDecorator('userName', {
            initialValue: '',
            rules: [
              { required: true, message: '必须输入用户名!' },
              { validator: validateAccount }
            ]
          })(
            <InputItem
              clear
              error={errors.userName && errors.userName.length > 0}
              onErrorClick={() => {
                alert(getFieldError('userName').map(i => i.message).join('、'));
              }}
              placeholder="请输入用户名"
            >用户名</InputItem>
          )}
          <p className={'error'}>{errors.userName?.map(i => i.message).join('、')}</p>

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
          <NavLink to="/signup" style={{float: 'right'}}>
          <Button type="primary" size="small" inline>注册</Button>
          </NavLink>
        </Item>
      </form>
    </div>
  )
}

export default Login;
