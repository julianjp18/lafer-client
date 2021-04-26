import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';
import {
  SAVE_SECURE_SELECTED,
  SAVE_SECURE_SELECTED_SUCCESS,
  SAVE_SECURE_SELECTED_FAILURE,
  EMIT_LICENSE_PLATE,
  EMIT_LICENSE_PLATE_SUCCESS,
  EMIT_LICENSE_PLATE_FAILURE
} from '../../constants';
import { API_URL } from '../../../apis/urls';

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
  let d = new Date();
  let tomorrow = d.setDate(d.getDate() + 1);
  tomorrow = new Date(tomorrow).toISOString();
  let today = new Date().toISOString();

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
  const error = [];
  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Customers`, {
    id: identification,
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
    startDate: tomorrow,
    endDate: today,
    currentQuote: today
  }, {
    "accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).then(response => {
    data.push(response);
  }).catch(e => {
    error.push(e);
  });

  if (error.length === 0) {
    yield call(showNotification, { type: 'success', message: 'Adquiriste tu SOAT, continua a pagarlo' });
    yield put({ type: "BUY_SOAT_FORM_SUCCESS", response: { formValues }, });
  } else {
    //yield call(showNotification, { type: 'error', message: "Error al adquirir el SOAT, por favor intente nuevamente en unos minutos" });
    yield put({ type: "BUY_SOAT_FORM_FAILURE", response: { error: error } });
  }

}

function* saveSecureSelected(formValues) {
  yield put({ type: SAVE_SECURE_SELECTED_SUCCESS, response: { ...formValues.payload }, });
};

function* saveEmitLicensePlate(formValues) {
  const error = [];
  const responseData = [];

  yield axios.post(`${API_URL}soat/emitLicencePlate`, {
    idTraceability: formValues.payload,
  }, {
    "accept": "*/*",
    "Access-Control-Allow-Origin": "*",
  }).then((response) => {

    responseData.push(response);
  }).catch(e => {
    error.push(e);
  });

  if (error.length === 0 && responseData.length > 0) {
    const response = responseData[0];
    const { data, status } = response;
    const dataFromResponse = data.data;

    if (status === 200) {
      if (response.data.MensajeError) {
        yield put({
          type: EMIT_LICENSE_PLATE_FAILURE, response: {
            statusError: 401,
            message: 'Ocurrió un error para emitir la licencia. Por favor inténtelo más tarde.'
          },
        });
      } else {
        if (data.codeHttp === 200 && dataFromResponse.procesadoExitoso) {
          yield put({ type: EMIT_LICENSE_PLATE_SUCCESS, response: dataFromResponse });
        } else {
          yield put({
            type: EMIT_LICENSE_PLATE_FAILURE, response: {
              statusError: 401,
              message: 'Ocurrió un error para emitir la licencia. Por favor inténtelo más tarde.'
            },
          });
        }
      }

    } else {
      yield put({ type: EMIT_LICENSE_PLATE_FAILURE, response: {}, });
    }
  } else {
    yield put({ type: EMIT_LICENSE_PLATE_FAILURE, response: {}, });
  }
};


export function* soatWatcher() {
  yield takeLatest('BUY_SOAT', buySoat)
  yield takeLatest('BUY_SOAT_FORM', buySoatForm)
  yield takeLatest(SAVE_SECURE_SELECTED, saveSecureSelected)
  yield takeLatest(EMIT_LICENSE_PLATE, saveEmitLicensePlate)
}
