import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';

function* secureCar(formValues) {
  const {
    vehicle,
    brand,
    model,
    name,
    lastName,
    typeIdentification,
    identification,
    email,
    address,
    birthDate,
    genre,
    zeroKm = false,
    cityCode = 14000,
    phone,
  } = formValues.payload;
  
  const dataSale = [];
  yield axios.post(`https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/liquidacion`, {
    "placaVehiculo": vehicle,
    "tipoDocumentoTomador": typeIdentification,
    "numeroDocumentoTomador": identification,
    "nombresTomador": name,
    "apellidosTomador": lastName,
    "fechaNacimientoTomador": birthDate,
    "generoConductor": genre,
    "marcaVehiculo": brand,
    "modeloVehiculo": Number.parseInt(model),
    "claveAsesor": 80125,
    "sumaAccesorios": 0,
    "ciudadMovilizacion": cityCode,
    "ceroKm": `${zeroKm}`,
    "periodoFact": 12,
  }, {
    "accept": "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-api-key": "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp",
  }).then(response => {
    dataSale.push(response);
  }).catch(e => {
    console.log(e);
  });

  if (dataSale.dataHeader.codRespuesta === 0) {
    const data = [];
    yield axios.post(`https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/cotizacion`, {
      "mailTomador": email,
      "celTomador": phone,
      "dirTomador": address,
      "ciuTomador": cityCode,
      "nomConductor": `${name} ${lastName}`,
      "sexoConductor": genre,
      "fecNacConductor": birthDate,
      "placaVeh": vehicle,
      "numLiquidacion": dataSale.data.responseData.numerodeliquidacion,
    }, {
      "accept": "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp",
    }).then(response => {
      data.push(response);
    }).catch(e => {
        console.log(e);
    });

    if (data.dataHeader.codRespuesta === 0) {
      yield put({ type: "SECURE_CAR_SUCCESS", response: { ...data.data, username: name + lastName }, });  
    } else {
      yield call(showNotification, { type: 'warning', message: 'Error en la cotización' });
      yield put({ type: "SECURE_CAR_FAILURE", response: { ...data }, });  
    }
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la liquidación' });
    yield put({ type: "SECURE_CAR_FAILURE", response: { ...dataSale }, });
  }
}

function* getCities() {
  const data = [];
  yield axios.get(`https://stg-api-conecta.segurosbolivar.com/stage/entidad/ciudades`, {
    "x-api-key": "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp",
    "claveAsesor": "123456",  
    "accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }).then(response => {
      data.push(response);
  }).catch(e => {
      console.log(e);
  });

  if (data.dataHeader.codRespuesta === 0) {
    //yield call(showNotification, { type: 'success', message: '' });
    yield put({ type: "GET_CITIES_SUCCESS", response: { ...data.data.catalogoDato }, });  
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de ciudades' });
    yield put({ type: "GET_CITIES_FAILURE", response: { ...data }, });
  }
}

export function* secureCarWatcher() {
  yield takeLatest('SECURE_CAR', secureCar)
  yield takeLatest('GET_CITIES', getCities)
}
