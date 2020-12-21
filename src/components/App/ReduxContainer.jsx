import React from 'react';
import { Provider } from 'react-redux';
import RouterContainer from './RouterContainer';
import configureStore from './configureStore';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <RouterContainer />
  </Provider>
);
