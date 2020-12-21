import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { RESEND_EMAIL } from '../constants';
import notify from '../../../helpers/notify';

const resendEmailNotifier = (formValues) =>
  notify({
    type: RESEND_EMAIL,
    formValues,
  });

function* resendEmailAction({ formValues }) {
  yield call(request, {
    type: RESEND_EMAIL,
    method: 'put',
    endpoint: '/users/resend-confirm-email',
    params: formValues,
  });
}

export { resendEmailAction, resendEmailNotifier };
