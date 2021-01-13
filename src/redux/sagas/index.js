import { all } from 'redux-saga/effects';
import { signInWatcher } from './auth/signIn';
import { signUpWatcher } from './auth/signUp';
import { vehicleWatcher } from './SOAT/vehicle';
import { clientWatcher } from './SOAT/client';
import { soatWatcher } from './SOAT/soat';
import { secureCarWatcher } from './car';
import { exampleWatcher } from '../../examples/redux/sagas';

export default function* rootSaga() {
  yield all([
    signInWatcher(),
    signUpWatcher(),
    vehicleWatcher(),
    soatWatcher(),
    clientWatcher(),
    secureCarWatcher(),
    exampleWatcher(),
  ]);
};
