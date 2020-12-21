import { push } from 'connected-react-router';
import { put, takeLatest } from 'redux-saga/effects';
import { ROOT_PATH } from '../../routing/paths';
import showNotification from '../helpers/showNotification';
import { LOG_OUT_MOVEMENT } from '../movements/constants';
import { CONFIRM_EMAIL_SUCCESS, LOG_IN_SUCCESS } from './devise/constants';

const logInPostAction = ({ payload: { token } }) => {
  localStorage.setItem('token', token);
};

function* logOutPostAction({ manual }) {
  yield put(push(ROOT_PATH));
  localStorage.removeItem('token');
  if (manual) {
    showNotification({ type: 'success', message: 'Sesion finalizada' });
  }
}

export default [
  takeLatest([LOG_IN_SUCCESS, CONFIRM_EMAIL_SUCCESS], logInPostAction),
  takeLatest([LOG_OUT_MOVEMENT], logOutPostAction),
];
