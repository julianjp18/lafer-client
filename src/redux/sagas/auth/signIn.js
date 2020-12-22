import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';

function* signIn(formValues) {
  //123qweQ!
  const { username, password } = formValues.payload;
  const data = [];
  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Account/login`, {
      usuario: username,
      password,
  }, {
    "accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).then(response => {
      data.push(response);
  }).catch(e => {
      console.log(e);
  });

  if (data[0].status !== 'Error') {
    yield call(showNotification, { type: 'success', message: data[0].message });
    yield put({ type: "SIGN_IN_SUCCESS", response: { ...data[0], username }, });  
  } else {
    yield call(showNotification, { type: 'warning', message: data[0].message });
    yield put({ type: "SIGN_IN_FAILURE", response: { ...data[0], username }, });
  }
  
}

export function* signInWatcher() {
  yield takeLatest('SIGN_IN', signIn)
}
