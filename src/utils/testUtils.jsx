/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

export const findByClassName = (component, className) =>
  component.find(className);

export const findByTestId = (wrapper, component, attr) =>
  wrapper.find(`${component}[data-testid='${attr}']`);

export const shallowSetup = (Component, props = {}) => {
  const component = shallow(<Component {...props} />);
  return component;
};

export const connectedMount = (Component, cmpStore, props = {}) => {
  const component = mount(
    <Provider store={cmpStore}>
      <Component {...props} />
    </Provider>
  );
  return component;
};

export const makeMockStore = (state = {}) => mockStore({ ...state });
