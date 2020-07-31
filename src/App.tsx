import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import './App.scss';
import './icon/iconfont.css';
import Calculator from './components/Calculator/calculator';

import {IStoreState} from './store/reducers';
import {getUserInfoRequest} from './store/reducers/modules/user/actionCreator';
import {UserInfoProps} from './store/reducers/modules/user/types';
import Counter from './pages/Counter';
import TodoList from './pages/TodoList';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

// import {getRecommendList} from './api/getList';


interface AppProps {
  userInfo: UserInfoProps;
  handlerLogin: () => void;
}

const App: React.FC<AppProps> = (props) => {
  // const {userInfo, handlerLogin} = props;


  return (
    <div className="App">
      <Router>
        <h3>{navigator.userAgent}</h3>
        <ul className="nav-wrapper">
        <li className="nav-item">
            <Link className="nav-link" to="/Counter">Counter</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/TodoList">TodoList</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/Calculator">Calculator</Link>
          </li>
        </ul>

        <section className="main-content">
          <Switch>
            <Redirect from="/" to="/TodoList" exact />
            <Route path="/Counter" component={Counter} />
            <Route path="/TodoList" component={TodoList} />
            <Route path="/Calculator" component={Calculator} />
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
  handlerLogin () {
    dispatch({
      type: 'aaa',
      action: getUserInfoRequest()
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
