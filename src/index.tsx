import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';

import './css/index.css';
import './css/StockDashboard.css'


import App from './containers/App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

