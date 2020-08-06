import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import { Button, Toast } from 'antd-mobile';
import './App.scss';

import TestCalculator from './pages/TestCalculator';

import { IStoreState } from './store/reducers';
import { getUserInfoRequest } from './store/reducers/modules/user/actionCreator';
import { UserInfoProps } from './store/reducers/modules/user/types';
import Counter from './pages/Counter';
import TodoList from './pages/TodoList';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import axios from './utils/axios';
// import {getRecommendList} from './api/getList';


interface AppProps {
  userInfo: UserInfoProps;
  handlerLogin: () => void;
}

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

const App: React.FC<AppProps> = (props) => {
  // const {userInfo, handlerLogin} = props;

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
        const {status, data} = res;
        if (status === 200) {
          const {token} = data;
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
    <div className="App">
      <Router>
        <h3>{navigator.userAgent}</h3>
        <Button onClick={login}>获取token</Button>
        <Button onClick={test}>测试按钮</Button>
        <ul className="nav-wrapper">
          <li className="nav-item">
            <Link className="nav-link" to="/Counter">Counter</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/TodoList">TodoList</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/TestCalculator">TestCalculator</Link>
          </li>
        </ul>

        <section className="main-content">
          <Switch>
            <Redirect from="/" to="/TodoList" exact />
            <Route path="/Counter" component={Counter} />
            <Route path="/TodoList" component={TodoList} />
            <Route path="/TestCalculator" component={TestCalculator} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  userInfo: state.user.userInfo
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handlerLogin() {
    dispatch({
      type: 'aaa',
      action: getUserInfoRequest()
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
