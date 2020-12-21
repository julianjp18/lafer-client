import { call } from 'redux-saga/effects';
import request from '../../../request';
import { SIGN_IN } from '../constants';
import notify from '../../../notify';

const signInNotifier = (formValues) =>
  notify({
    type: SIGN_IN,
    formValues,
  });

function* signInAction({ formValues, callback }) {
  yield call(request, {
    type: SIGN_IN,
    method: 'post',
    endpoint: '/Account/login',
    params: formValues,
    callback,
  });
}

export { signInAction, signInNotifier };
