import { call } from 'redux-saga/effects';
import request from '../../../request';
import { SIGN_UP } from '../constants';
import notify from '../../../notify';

const signUpNotifier = (formValues) =>
  notify({
    type: SIGN_UP,
    formValues,
  });

function* signUpAction({ formValues, callback }) {
  yield call(request, {
    type: SIGN_UP,
    method: 'post',
    endpoint: '/Account/register',
    params: formValues,
    callback,
  });
}

export { signUpAction, signUpNotifier };
