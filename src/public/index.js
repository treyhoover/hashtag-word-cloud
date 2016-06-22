import 'babel-polyfill';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // https://github.com/zilverline/react-tap-event-plugin
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import AppContainer from './containers/AppContainer';
import configureStore from './store';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
