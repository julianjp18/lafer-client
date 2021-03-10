import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import showNotification from '../../showNotification';

function* client(formValues) {
  yield put({ type: "CLIENT_INFO_SUCCESS", client_info: formValues.payload, });
}

function* mainInfo(formValues) {
  localStorage.setItem("fetchedInfo", "");
  const error = [];
  const data = [];
  yield axios.post(`${process.env.REACT_APP_API_URL}/getQuote`, formValues.payload, {
    "accept": "*/*",
    "Access-Control-Allow-Origin": "*",
  }).then((response) => {
    data.push(response);
    localStorage.setItem("fetchedInfo", true)
  }).catch(e => {
    error.push(e);
    localStorage.setItem("fetchedInfo", false)
  });

  if (error.length === 0) {
    message.success('!Datos correctos!');
    //yield call(showNotification, { type: 'success', message: 'Datos correctos' });
    yield put({ type: "MAIN_INFO_SUCCESS", response: data[0].data });
  } else {
    message.info('!Por favor completa los datos!');
    yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor intentalo nuevamente' });
    yield put({ type: "MAIN_INFO_FAILURE", response: {}, });
  }
}

export function* clientWatcher() {
  yield takeLatest('CLIENT_INFO', client);
  yield takeLatest('MAIN_INFO', mainInfo);
}
