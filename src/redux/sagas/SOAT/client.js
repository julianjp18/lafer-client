import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import showNotification from '../../showNotification';

function* client(formValues) {
  console.log(formValues);
  yield put({ type: "CLIENT_INFO_SUCCESS", client_info: formValues.payload, });
}

function* mainInfo(formValues) {
  const { identification } = formValues.payload;
  const error = [];
  const data = [];
  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Clientes/identificacion${identification}`, {
    id: identification,
  }, {
    "accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).then(response => {
    data.push(response);
  }).catch(e => {
    localStorage.setItem('client-data-soat', '');
    error.push(e);
  });

  if (error.length === 0) {
    localStorage.setItem('client-data-soat', JSON.stringify(data[0].data));
    message.success('!Datos correctos!');
    //yield call(showNotification, { type: 'success', message: 'Datos correctos' });
    yield put({ type: "MAIN_INFO_SUCCESS", response: { ...data[0].data }, });
  } else {
    message.info('!Por favor completa los datos!');
    //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor intentalo nuevamente' });
    yield put({ type: "MAIN_INFO_FAILURE", response: {}, });
  }
}

export function* clientWatcher() {
  yield takeLatest('CLIENT_INFO', client);
  yield takeLatest('MAIN_INFO', mainInfo);
}
