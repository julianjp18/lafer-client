import { push } from 'connected-react-router';
import { call, put } from 'redux-saga/effects';
import { ROOT_PATH } from '../routing/paths';
import notification from './notification';
import action from './action';

export default function* defaultFailure(type, data, code, status) {
  switch (code || status) {
    case 404:
      yield put(push(ROOT_PATH));
      break;
    case 408:
      yield call(notification, {
        type: 'error',
        message:
          'Error al comunicarse con el servidor, intenta de nuevo mas tarde',
      });
      break;
    default:
      break;
  }
  yield put(action(`${type}_FAILURE`, data));
}
