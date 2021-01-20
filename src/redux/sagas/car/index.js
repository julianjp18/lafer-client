import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import http from "../../../axios/sura";
import showNotification from '../../showNotification';

const PASSWORD_ASESOR = "29528";
const API_KEY = "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp";
const QUOTATION_ENDPOINT = "https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/cotizacion";
const HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

function* secureCar(formValues) {
  const {
    vehicle,
    brand,
    model,
    name,
    lastName,
    typeIdentification,
    identification,
    birthDate,
    genre,
    zeroKm = false,
    cityCode = 14000,
  } = formValues.payload;
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-api-key", API_KEY);
  
  let dataFormValues = {
    "placaVehiculo": vehicle ? vehicle : 'QWQ654',
    "tipoDocumentoTomador": typeIdentification,
    "numeroDocumentoTomador": Number.parseInt(identification),
    "nombresTomador": name,
    "apellidosTomador": lastName,
    "fechaNacimientoTomador": birthDate,
    "generoConductor": genre,
    "claveAsesor": Number.parseInt(PASSWORD_ASESOR),
    "sumaAccesorios": 0,
    "ciudadMovilizacion": Number.parseInt(cityCode),
    "ceroKm": `${zeroKm}`,
    "periodoFact": 12,
    "marcaVehiculo": "4601258",
    "modeloVehiculo": Number.parseInt(model),  
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-api-key", API_KEY);

  var raw = JSON.stringify(dataFormValues);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  /*
  const response = yield fetch("https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/liquidacion", requestOptions);
  const data = yield response.json();
  console.log(data);
  
  */
  const response = yield http.post("/seguro-autos/liquidacion", dataFormValues );
  
  console.log(response);
  const data = response.data;

  if (data.dataHeader.codRespuesta === 200) {
    yield call(showNotification, { type: 'success', message: 'Visualiza la lista de productos' });
    yield put({ type: "SECURE_CAR_SUCCESS", response: { ...data.data }, });
  } else if (data.dataHeader.codRespuesta === 400) {
    console.log(data.dataHeader.errores[0], data.dataHeader.errores[0].idError);
    if (data.dataHeader.errores[0].idError === 1000) {
      yield call(showNotification, { type: 'warning', message: 'La placa y el modelo no concuerdan' });
    } else {
      yield call(showNotification, { type: 'warning', message: response.dataHeader.errores[0].descError });
    }
    yield put({ type: "SECURE_CAR_FAILURE", response: { ...data.dataHeader.errores[0] }, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la liquidación' });
    yield put({ type: "SECURE_CAR_FAILURE", response: { ...data.dataHeader }, });
  }
}

function* getQuotation(formValues) {
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
    settlementNumber,
  } = formValues.payload;

  const quotationDataOne = {
    "mailTomador": email,
    "celTomador": phone,
    "dirTomador": address,
    "ciuTomador": cityCode,
    "nomConductor": `${name} ${lastName}`,
    "sexoConductor": genre,
    "fecNacConductor": birthDate,
    "placaVeh": vehicle,
    "numLiquidacion": settlementNumber,
  };
  const dataOne = yield axios.post(QUOTATION_ENDPOINT, quotationDataOne, HEADERS);
  
  const resOne = yield dataOne.json();

  yield put({ type: "SECURE_CAR_SUCCESS", response: { ...resOne.data } });
}

function* getCities() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-api-key", API_KEY);

  var raw = JSON.stringify({"claveAsesor": PASSWORD_ASESOR});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = yield fetch("https://stg-api-conecta.segurosbolivar.com/stage/listaCiudades?x-api-key=UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp&claveAsesor=29528&Content-Type=application/json", requestOptions);
  const data = yield response.json();

  if (data.dataHeader.codRespuesta === 200) {
    yield put({ type: "GET_CITIES_SUCCESS", response: [...data.data.catalogoDato] , });  
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de ciudades' });
    yield put({ type: "GET_CITIES_FAILURE", response: { ...data }, });
  }
}

export function* secureCarWatcher() {
  yield takeLatest('SECURE_CAR', secureCar)
  yield takeLatest('GET_CITIES', getCities)
}
