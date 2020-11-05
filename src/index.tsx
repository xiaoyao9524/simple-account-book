import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import store from './store';
import 'normalize.css/normalize.css'
import './styles/index.scss';
import App from './App';

ReactDOM.render(
  <DndProvider backend={TouchBackend} >
    <Provider store={store}>
      <App />
    </Provider>
  </DndProvider>,
  document.getElementById('root')
);

