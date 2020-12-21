import { call, takeLatest } from 'redux-saga/effects';
import { SIGN_IN, SIGN_UP } from './constants';
import apiCall from '../../../apis';
import { signInAction } from './actions/signIn';
import { signUpAction } from './actions/signUp';

// put: dispara acciones
// call: llamada a API
// takeLatest: función que se mantenga escuchanfo

export function* signInTest({ payload }) {
  try {
    const results = yield call(apiCall, 'post', '');
  } catch (err) {
    console.log('err in saga', err);
  }
}

//WATCHERS: vigila o escucha cuando las acciones son disparadas
export default [
  takeLatest(SIGN_IN, signInAction),
  takeLatest(SIGN_UP, signUpAction),
]