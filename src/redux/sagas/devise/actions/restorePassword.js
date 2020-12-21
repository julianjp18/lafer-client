import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { RESTORE_PASSWORD } from '../constants';
import notify from '../../../helpers/notify';

const formatter = ({
  formValues: { passwordConfirmation, restorePasswordToken, ...rest },
}) => ({
  formValues: {
    restorePasswordToken,
    ...rest,
  },
});

const restorePasswordNotifier = (formValues) =>
  notify({
    type: RESTORE_PASSWORD,
    formValues,
    formatter,
  });

function* restorePasswordAction({
  formValues: { restorePasswordToken, ...rest },
}) {
  yield call(request, {
    type: RESTORE_PASSWORD,
    method: 'put',
    endpoint: `/users/restore-password?restorePasswordToken=${restorePasswordToken}`,
    params: rest,
  });
}

export { restorePasswordAction, restorePasswordNotifier };
