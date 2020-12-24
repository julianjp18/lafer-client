import { all } from 'redux-saga/effects';
import { signInWatcher } from './auth/signIn';
import { signUpWatcher } from './auth/signUp';
import { vehicleWatcher } from './SOAT/vehicle';
import { clientWatcher } from './SOAT/client';
import { soatWatcher } from './SOAT/soat';

export default function* rootSaga() {
  yield all([
    signInWatcher(),
    signUpWatcher(),
    vehicleWatcher(),
    soatWatcher(),
    clientWatcher(),
  ]);
};