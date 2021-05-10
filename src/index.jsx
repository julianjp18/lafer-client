import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { logger } from 'redux-logger';
import reducer from './redux/reducers';
import App from './components/App';
import rootSaga from './redux/sagas';
//import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import history from './routing/history';

const sagaMiddleware = createSagaMiddleware();

const allReducers = combineReducers({
  app: reducer,
  router: connectRouter(history),
});

const store = createStore(
  allReducers,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router onUpdate={hashLinkScroll} history={history}>
        <App />
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister()

if (module.hot) { module.hot.accept(App); }
