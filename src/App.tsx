import React from 'react';
import {useSelector} from 'react-redux';
import {IStoreState} from './store/reducers'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


// pages
import TestCalculator from './pages/TestCalculator';
import Home from './pages/Home';
import Counter from './pages/Counter';
import TodoList from './pages/TodoList';
import TestPage1 from './pages/TestPage1';
import TestPage2 from './pages/TestPage2';
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
            <Route path="/Counter" component={Counter} />
            <Route path="/TodoList" component={TodoList} />
            <Route path="/TestCalculator" component={TestCalculator} />
            <Route path="/TestPage1" component={TestPage1} />
            <Route path="/TestPage2" component={TestPage2} />
          </Switch>
        </section>

        <TabBar />
      </Router>
    </div>
  );
}

export default App;
