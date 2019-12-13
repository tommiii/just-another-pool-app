import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import poolApp from './reducers';
import PoolApp from './containers/PoolApp';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(
  poolApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <PoolApp />
  </Provider>,
  document.getElementById('root')
);
