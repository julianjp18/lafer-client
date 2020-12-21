import { push } from 'connected-react-router';
import { call, put } from 'redux-saga/effects';
import { ROOT_PATH } from '../../routing/paths';
import logOutMovement from '../movements/authMovements';
import showNotification from './showNotification';
import triggerAction from './triggerAction';

export default function* defaultFailure(type, data, code, status) {
  switch (code || status) {
    case 404:
      yield put(push(ROOT_PATH));
      break;
    case 401:
      yield put(logOutMovement(false));
      break;
    case 408:
      yield call(showNotification, {
        type: 'error',
        message:
          'Error al comunicarse con el servidor, intenta de nuevo mas tarde',
      });
      break;
    default:
      break;
  }
  yield put(triggerAction(`${type}_FAILURE`, data));
}
