import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';

function* signUp(formValues) {
  const { nickname, email, password, fullName, phoneNumber } = formValues.payload;
  const data = [];
  const error = [];
  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Account/register`, {
    username: nickname,
    FullName: fullName,
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
    error.push(e);
    console.log(e);
  });

  if (data[0].token) {
    yield call(showNotification, { type: 'success', message: data[0].response.message });
    yield put({ type: "SIGN_UP_SUCCESS", response: { ...data[0], username: nickname, email: email }, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Usuario creado, pero fallo mensaje de bienvenida' });
    yield put({ type: "SIGN_UP_FAILURE", response: { ...error[0], email }, });
  }
}

export function* signUpWatcher() {
  yield takeLatest('SIGN_UP', signUp)
}
