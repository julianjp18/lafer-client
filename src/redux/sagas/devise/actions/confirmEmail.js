import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { CONFIRM_EMAIL } from '../constants';
import notify from '../../../helpers/notify';

const formatter = ({ formValues }) => ({
  confirmationToken: formValues.split('=')[1],
});

const confirmEmailNotifier = (formValues) =>
  notify({
    type: CONFIRM_EMAIL,
    formValues,
    formatter,
  });

function* confirmEmailAction({ confirmationToken }) {
  yield call(request, {
    type: CONFIRM_EMAIL,
    method: 'get',
    endpoint: `/users/confirm-email?confirmationToken=${confirmationToken}`,
  });
}

export { confirmEmailAction, confirmEmailNotifier };
