import { all } from 'redux-saga/effects';
import { signInWatcher } from './auth/signIn';
import { signUpWatcher } from './auth/signUp';

export default function* rootSaga() {
  yield all([
    signInWatcher(),
    signUpWatcher(),
  ]);
};