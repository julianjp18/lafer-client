import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';

function* buySoat(formValues) {
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
    yield put({ type: "BUY_SOAT_SUCCESS", buy_soat: { ...data[0], username }, });
  } else {
    yield call(showNotification, { type: 'warning', message: data[0].message });
    yield put({ type: "BUY_SOAT_FAILURE", response: { ...data[0], username }, });
  }

}

function* buySoatForm(formValues) {
  const { vehicle_info, client_info, buy_soat } = formValues.payload;
  const {
    typeVehicle,
    line,
    classVehicle,
    model,
    plate,
    brand,
  } = vehicle_info;
  const {
    identificationType,
    phoneNumber,
    name,
    lastName,
    email,
    address,
    city,
    identification,
  } = client_info;
  const { cupon } = buy_soat;

  const data = [];
  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Costumers`, {
    id:identification,
    name,
    lastName,
    email,
    movil: phoneNumber,
    placa: plate,
    isAuthorizedTerm: true,
    brand,
    class: classVehicle,
    line,
    model,
    valorPrima: Number.parseInt(typeVehicle),
    identificationType,
    identification,
    city,
    address,
    codigoCupon: cupon,
    isBuy: true,
    startDate: "2020-12-25T08:44:53.510Z",
    endDate:"2021-12-24T08:44:53.510Z",
    currentQuote: "2020-12-24T08:44:53.510Z"
  }, {
    "accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).then(response => {
    data.push(response);
  }).catch(e => {
    console.log(e);
  });

  yield call(showNotification, { type: 'success', message: 'Adquiriste tu SOAT, continua a pagarlo' });
    
  if (data[0].status !== 'Error') {
    yield call(showNotification, { type: 'success', message: 'Adquiriste tu SOAT, continua a pagarlo' });
    yield put({ type: "BUY_SOAT_FORM_SUCCESS", response: { formValues }, });
  } else {
    yield call(showNotification, { type: 'warning', message: data[0].message });
    yield put({ type: "BUY_SOAT_FORM_FAILURE", response: { ...data[0] }, });
  }

}

export function* soatWatcher() {
  yield takeLatest('BUY_SOAT', buySoat)
  yield takeLatest('BUY_SOAT_FORM', buySoatForm)
}
