/* eslint-disable no-unused-vars */
import { reduxForm } from 'redux-form';
import { SimpleLogIn } from '.';
import { connectedMount, makeMockStore } from '../../../utils/testUtils';

const LogIn = reduxForm({ form: 'logInForm' })(SimpleLogIn);

describe('Login', () => {
  let component;
  const store = makeMockStore();

  const props = {
    openForgotPassword: jest.fn(),
    logIn: jest.fn(),
    confirmEmail: jest.fn(),
    recoverPassword: jest.fn(),
    openRestorePassword: jest.fn(),
    restorePassword: jest.fn(),
    search: '/',
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    component = connectedMount(LogIn, store, props);
  });

  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});
