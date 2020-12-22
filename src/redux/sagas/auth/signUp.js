import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';

function* signUp(formValues) {
  const { nickname, email, password, fullName, phoneNumber } = formValues.payload;
  const data = [];

  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Account/register`, {
    username: nickname,
    fullName,
    phoneNumber,
    email,
    password
  }, {
    "accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).then(response => {
    data.push(response.data);
  }).catch(e => {
    console.log(e);
  });

  if (data[0].status !== 'Error') {
    yield call(showNotification, { type: 'success', message: data[0].message });
    yield put({ type: "SIGN_UP_SUCCESS", response: { ...data[0], username: nickname, email: email }, });
  } else {
    yield call(showNotification, { type: 'warning', message: data[0].message });
    yield put({ type: "SIGN_UP_FAILURE", response: { ...data[0], email }, });
  }
}

export function* signUpWatcher() {
  yield takeLatest('SIGN_UP', signUp)
}
