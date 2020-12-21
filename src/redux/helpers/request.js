import { call, put } from 'redux-saga/effects';
import server from '../../apis/server';
import { HIDE_LOADER_MOVEMENT } from '../movements/constants';
import defaultFailure from './defaultFailure';
import defaultSuccess from './defaultSuccess';
import showNotification from './showNotification';

const formatParams = (method, params) =>
  method === 'get' ? { params } : params;

function* request({
  type,
  method,
  endpoint,
  params = {},
  path = null,
  callback = null,
  onSuccess = defaultSuccess,
  onFailure = defaultFailure,
}) {
  const response = yield call(
    [server, method],
    endpoint,
    formatParams(method, params)
  );
  if (!response) {
    const message =
      'Error al comunicarse con el servidor, intenta de nuevo mas tarde';
    yield call(showNotification, { type: 'error', message });
  } else {
    const { success, info, data, code } = response.data;
    const { status } = response;
    if (success) {
      yield call(onSuccess, type, data, path, callback);
    } else {
      yield call(onFailure, type, data, code, status);
    }
    yield call(showNotification, info);
  }
  yield put({ type: HIDE_LOADER_MOVEMENT });
}

export default request;
