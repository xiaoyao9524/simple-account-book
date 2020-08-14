import React from 'react';
import {useSelector} from 'react-redux';
import {IStoreState} from './store/reducers'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


// pages
import Login from './pages/Login';
import Home from './pages/Home';
import Bookkeeping from './pages/Bookkeeping';
import My from './pages/My';

// test
import TestCalculator from './pages/TestCalculator';
import Counter from './pages/Counter';
import TodoList from './pages/TodoList';
import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
// components
import TabBar from './components/TabBar';

const App: React.FC = () => {
  const isIOS = useSelector<IStoreState>(state => state.system.isIOS);
  return (
    <div className={`App ${isIOS ? 'is-ios' : ''}`}>
      <Router>
        <section className="main-content">
          <Switch>
            <Route from="/" exact component={Home} />
            <Route path="/bookkeeping" component={Bookkeeping} />
            <Route path="/my" component={My} />
            <Route path="/login" component={Login} />

            <Route path="/Counter" component={Counter} />
            <Route path="/TodoList" component={TodoList} />
            <Route path="/TestCalculator" component={TestCalculator} />
            <Route path="/TestPage1" component={TestPage1} />
            <Route path="/TestPage2" component={TestPage2} />
            <Route path="/TestPage3" component={TestPage3} />
          </Switch>
        </section>

        <TabBar />
      </Router>
    </div>
  );
}

export default App;
