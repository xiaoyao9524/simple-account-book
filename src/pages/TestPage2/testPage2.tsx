import React from 'react';
import { Button, Toast } from 'antd-mobile';
import axios from '../../utils/axios';


interface ILoginProps {
  token: string;
}

interface IListItemProps {
  id: number;
  title: string;
}

interface IListProps {
  msg: string;
  list: IListItemProps[];
}

const TestPage2: React.FC = () => {
  function login() {
    axios<ILoginProps>({
      method: 'post',
      url: '/api/admin/login',
      data: {
        username: 'admin',
        lastName: '123456'
      }
    })
      .then(res => {
        const { status, data } = res;
        if (status === 200) {
          const { token } = data;
          localStorage.setItem('token', token);
        }
        // localStorage.setItem('token', res);
      })
      .catch(err => {
        console.log(err);
        Toast.fail(err.message, 1);
      })
  }

  function test() {
    axios<IListProps>({
      method: 'post',
      url: '/api/home/list',
      params: {
        foo: 1,
        bar: 2
      },
      data: {
        a: 3,
        b: 4
      }
    })
      .then(res => {
        console.log(222, res);
      })
      .catch(err => {
        console.log(err);
        Toast.fail(err.message, 1);
      })
  }
  return (
    <div className="test-page2">
      <h3>测试页面2</h3>
      <h3>{navigator.userAgent}</h3>
      <Button onClick={login}>获取token</Button>
      <Button onClick={test}>测试按钮</Button>
    </div>
  )
}

export default TestPage2;
