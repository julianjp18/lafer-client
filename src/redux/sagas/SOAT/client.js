import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import {
  CLIENT_INFO,
  CLIENT_INFO_FAILURE,
  CLIENT_INFO_SUCCESS,
  MAIN_INFO,
  MAIN_INFO_FAILURE,
  MAIN_INFO_SUCCESS,
} from '../../constants';
import { API_URL } from '../../../apis/urls';

function* clientInfo(action) {
  const { email, phone, identification, plate, discount_id, address } = action.payload;
  const error = [];
  const responseData = [];

  yield axios.post(`${API_URL}soat/getQuote`, {
    plate,
    discount_id,
    documentNumber: identification.number,
    documentType: identification.type,
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
    if (response.status === 200) {

      if (response.data.MensajeError) {
        //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor inténtalo nuevamente' });
        yield put({
          type: CLIENT_INFO_FAILURE, response: {
            statusError: 401,
            message: 'El número ingresado no coincide con el del propietario.'
          },
        });
      } else {
        const { data } = response;
        const responseAdditionalData = [];

        yield axios.post(`${API_URL}soat/setAdditionalData`, {
          cotizacion_id: data.cotizaciones[0].cotizacion_nro,
          traceaid: data.TraceaId,
          email,
          movil: phone,
          address,
          codClase: data.homologaciones[0].clase.codClase,
        }, {
          "accept": "*/*",
          "Access-Control-Allow-Origin": "*",
        }).then((response) => {

          responseAdditionalData.push(response);
        }).catch(e => {
          error.push(e);
        });

        if (responseAdditionalData[0].status === 200) {
          yield put({
            type: CLIENT_INFO_SUCCESS,
            client_info: {
              ...data,
              additionalData: {
                email,
                phone,
                address,
                ...responseAdditionalData[0].data,
              },
            }
          });
        } else {
          message.info('Error comunicación con el servidor. Por favor inténtelo más tarde');
          //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor inténtalo nuevamente' });
          yield put({ type: CLIENT_INFO_FAILURE, response: {}, });
        }
      }

    } else {
      message.info('Error comunicación con el servidor. Por favor inténtelo más tarde');
      //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor inténtalo nuevamente' });
      yield put({ type: CLIENT_INFO_FAILURE, response: {}, });
    }
  } else {
    message.info('!Por favor inténtalo nuevamente!');
    //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor inténtalo nuevamente' });
    yield put({ type: CLIENT_INFO_FAILURE, response: {}, });
  }
}

function* mainInfo(action) {
  const { plate } = action.payload;
  message.info('Validando información, puede tardar unos minutos...');
  const error = [];
  const responseData = [];

  yield axios.get(`${API_URL}soat/getLicencePlate/${plate}`, {
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
          type: MAIN_INFO_FAILURE, response: {
            statusError: 401,
            message: 'No se puede emitir SOAT a este vehículo.'
          },
        });
      } else {
        if (data.codeHttp === 200 && dataFromResponse.totalValue !== 0) {
          yield put({ type: MAIN_INFO_SUCCESS, response: data });
        } else {
          yield put({
            type: MAIN_INFO_FAILURE, response: {
              statusError: 401,
              message: 'No se puede emitir SOAT a este vehículo.'
            },
          });
        }
      }
      //message.success('!Datos correctos!');
      //yield call(showNotification, { type: 'success', message: 'Datos correctos' });

    } else {
      //message.info('!Por favor completa los datos!');
      //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor inténtalo nuevamente' });
      yield put({ type: MAIN_INFO_FAILURE, response: {}, });
    }
  } else {
    //message.info('!Por favor completa los datos!');
    //yield call(showNotification, { type: 'warning', message: 'Datos incorrectos, por favor inténtalo nuevamente' });
    yield put({ type: MAIN_INFO_FAILURE, response: {}, });
  }
}

export function* clientWatcher() {
  yield takeLatest(CLIENT_INFO, clientInfo);
  yield takeLatest(MAIN_INFO, mainInfo);
}
