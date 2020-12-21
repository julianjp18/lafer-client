import { call } from 'redux-saga/effects';
import moment from 'moment';
import request from '../../../helpers/request';
import { SIGN_UP } from '../constants';
import notify from '../../../helpers/notify';

const formatter = ({
  formValues: { passwordConfirmation, phone, indicative, birthDate, ...rest },
}) => ({
  formValues: {
    phone: `+${indicative}${phone}`,
    birthDate: moment(birthDate, 'DD/MM/YYYYY').format('YYYY-MM-DD'),
    ...rest,
  },
});

const signUpNotifier = (formValues) =>
  notify({
    type: SIGN_UP,
    formValues,
    formatter,
  });

function* signUpAction({ formValues }) {
  yield call(request, {
    type: SIGN_UP,
    method: 'post',
    endpoint: `/users/${formValues.role.toLowerCase()}/sign-up`,
    params: formValues,
  });
}

export { signUpAction, signUpNotifier };
