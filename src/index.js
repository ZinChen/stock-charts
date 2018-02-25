import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import './style.less';

import Dashboard from './components/Dashboard'

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>, document.getElementById('root')
)
