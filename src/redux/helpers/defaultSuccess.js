import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import triggerAction from './triggerAction';

export default function* defaultSuccess(type, data, path = null, callback) {
  if (path) yield put(push(path));
  yield put(triggerAction(`${type}_SUCCESS`, data));
  if (callback) yield call(callback, data);
}
