import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { RESEND_EMAIL, RECOVER_PASSWORD } from '../constants';
import notify from '../../../helpers/notify';

const recoverPasswordNotifier = (formValues, callback) =>
  notify({
    type: RECOVER_PASSWORD,
    formValues,
    callback,
  });

function* recoverPasswordAction({ formValues, callback }) {
  yield call(request, {
    type: RESEND_EMAIL,
    method: 'post',
    endpoint: '/users/recover-password',
    params: formValues,
    callback,
  });
}

export { recoverPasswordAction, recoverPasswordNotifier };
