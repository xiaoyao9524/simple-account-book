import React, { useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import NavBar from '../../components/NavBar'

/** components */
import {

} from 'antd-mobile';

/** style */
import './style.scss';

interface ILocalState {
  type?: '支出' | '收入';
}

const InsertCategory = () => {
  const history = useHistory();
  const location = useLocation<ILocalState>();

  const state = location.state;
  console.log('state: ', state);
  

  useEffect(() => {
    if (!state || !state.type) {
      history.replace('/');
    }
  })

  return (
    <div className="insert-category">
      <NavBar>新增类别</NavBar>
      新增类别
    </div>
  )
}

export default InsertCategory;
