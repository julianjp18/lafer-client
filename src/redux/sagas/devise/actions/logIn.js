import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { LOG_IN } from '../constants';
import notify from '../../../helpers/notify';

const logInNotifier = (formValues) =>
  notify({
    type: LOG_IN,
    formValues,
  });

function* logInAction({ formValues, callback }) {
  yield call(request, {
    type: LOG_IN,
    method: 'post',
    endpoint: '/users/log-in',
    params: formValues,
    callback,
  });
}

export { logInAction, logInNotifier };
