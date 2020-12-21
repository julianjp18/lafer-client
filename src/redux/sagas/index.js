import { all } from 'redux-saga/effects';
// all: ejecuta todos los watchers del proyecto
import auth from './auth';


export default function* rootSaga() {
  yield all([
    ...auth,
  ]);
}