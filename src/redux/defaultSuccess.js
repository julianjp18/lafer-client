import { put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import action from './action';

export default function* defaultSuccess(type, data, path = null, callback) {
    if (path) yield put(push(path));
    yield put(action(`${type}_SUCCESS`, data));
    if (callback) yield call(callback, data);
}
