import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from './store/reducers';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Bookkeeping from './pages/Bookkeeping';
import My from './pages/My';
import CategorySetting from './pages/CategorySetting';

// store
import { setSystemInfoAction } from './store/reducers/modules/system/actionCreators';

// test
import TestCalculator from './pages/TestCalculator';
import Counter from './pages/Counter';
import Counter2 from './pages/Counter2';
import TodoList from './pages/TodoList';
import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
// components
// import TabBar from './components/TabBar';


const App: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setSystemInfoAction());

  const isMobile = useSelector<IStoreState>(state => state.system.isMobile);

  window.addEventListener('resize', () => {
    console.log('app-resize');
    
    dispatch(setSystemInfoAction());
  })

  return (

    <div className={`App ${isMobile ? 'is-ios' : ''}`}>
      <Router>
        <section className="main-content">
          <Switch>
            <Route from="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/bookkeeping" component={Bookkeeping} />
            <Route path="/my" component={My} />
            <Route path="/categorySetting" component={CategorySetting} />
            {/* 测试页面 */}
            <Route path="/Counter" component={Counter} />
            <Route path="/Counter2" component={Counter2} />
            <Route path="/TodoList" component={TodoList} />
            <Route path="/TestCalculator" component={TestCalculator} />
            <Route path="/TestPage1" component={TestPage1} />
            <Route path="/TestPage2" component={TestPage2} />
            <Route path="/TestPage3" component={TestPage3} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
