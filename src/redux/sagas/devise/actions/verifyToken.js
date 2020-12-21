import { call, put } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { VERIFY_TOKEN, VERIFY_TOKEN_FAILURE } from '../constants';
import notify from '../../../helpers/notify';

const verifyTokenNotifier = () =>
  notify({
    type: VERIFY_TOKEN,
    loader: false,
  });

function* verifyTokenAction() {
  if (localStorage.getItem('token')) {
    yield call(request, {
      type: VERIFY_TOKEN,
      method: 'post',
      endpoint: '/users/verify-token',
    });
  } else {
    yield put({ type: VERIFY_TOKEN_FAILURE });
  }
}

export { verifyTokenAction, verifyTokenNotifier };
