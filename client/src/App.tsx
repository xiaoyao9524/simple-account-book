import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '@/store/reducers';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Bookkeeping from './pages/Bookkeeping';
import My from '@/pages/My';
import CategorySetting from '@/pages/CategorySetting';
import InsertCategory from '@/pages/InsertCategory';
import DeleteCategoryAndBill from '@/pages/DeleteCategoryAndBill';

// store
import { setSystemInfoAction } from '@/store/reducers/modules/system/actionCreators';
import { getSetUserDataByLocalAction } from '@/store/reducers/modules/user/actionCreator';

const App: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setSystemInfoAction());
  dispatch(getSetUserDataByLocalAction());

  const isMobile = useSelector<IStoreState>(state => state.system.isMobile);

  window.addEventListener('resize', () => {
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
            <Route path="/insertCategory" component={InsertCategory} />
            <Route path="/deleteCategoryAndBill" component={DeleteCategoryAndBill} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
