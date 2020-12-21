import { call } from 'redux-saga/effects';
import server from '../apis/server';
import defaultFailure from './defaultFailure';
import defaultSuccess from './defaultSuccess';
import notification from './notification';

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
      'Error to communicate with server, please try it in another time';
    yield call(notification, { type: 'error', message });
  } else {
    const { success, info, data, code } = response.data;
    const { status } = response;
    if (success) {
      yield call(onSuccess, type, data, path, callback);
    } else {
      yield call(onFailure, type, data, code, status);
    }
    yield call(notification, info);
  }
}

export default request;
