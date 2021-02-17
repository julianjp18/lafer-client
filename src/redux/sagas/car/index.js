import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import http from "../../../axios/sura";
import showNotification from '../../showNotification';
import { GET_CITIES, GET_CITIES_FAILURE, GET_CITIES_SUCCESS, SECURE_CAR, SECURE_CAR_FAILURE, SECURE_CAR_SUCCESS } from '../../constants';

const PASSWORD_ASESOR = "29528";
const API_KEY = "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp";
const QUOTATION_ENDPOINT = "https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/cotizacion";
const HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

const createLead = async (dataFormValues) => {
  const {
    vehicle,
    name,
    identification,
    email,
    address,
    identificationType,
    model,
    brand,
    zeroKm,
    genre,
    birthDate,
    lastName,
    phone,
    cityName,
  } = dataFormValues;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  var raw = JSON.stringify(
    {
      "method": "createLeads",
      "params":
      {
        "objects": [
          {
            firstName: name,
            lastName: lastName,
            emailAddress: email,
            city: cityName,
            street: address,
            phoneNumber: phone,
            identificacion_6010175c91f14: identificationType,
            placa_600763145ae42: vehicle,
            km_60103e68e2f71: zeroKm.toString(),
            genero_601018cc37291: genre,
            fechanacimiento_601018915d3bf: birthDate,
            numeroid_6010179c38d01: identification,
          }
        ]
      },
      "id": `123${identification}`
    }
  );

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const url = "https://api.sharpspring.com/pubapi/v1/?accountID=76FD61825495DAC83BD6A631F10B3E91&secretKey=08F1969173F67ABD5FB267D6E2547FB5"
  fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
    .then(response => response.text())
    .then(result => {
      const idLeadSharp = JSON.parse(result).result.creates[0].id;
      var list = JSON.stringify(
        {
          "method": "addListMember",
          "params": {
            "listID": "3668343810",
            "memberID": idLeadSharp
          },
          "id": `123${identification}`
        }
      );
      var requestList = {
        method: 'POST',
        headers: myHeaders,
        body: list,
      };
      fetch("https://cors-anywhere.herokuapp.com/" + url, requestList)
        .then(response => response.text())
        .then(result => {
        })
      })
    .catch(error => console.log('error', error));
}

function* secureCar(formValues) {
  const {
    vehicle,
    model,
    name,
    lastName,
    identificationType,
    identification,
    birthDate,
    genre,
    email,
    city,
    address,
    zeroKm = false,
    cityCode = 14000,
    phoneNumber,
    phone,
    cityName,
    brand,
  } = formValues.payload;

  createLead({
    vehicle,
    name,
    identification,
    email,
    address,
    identificationType,
    zeroKm,
    genre,
    birthDate,
    lastName,
    phone,
    cityName,
    brand,
    model,
  });

  let dataFormValues = {
    "placaVehiculo": vehicle ? vehicle : 'QWQ654',
    "tipoDocumentoTomador": identificationType,
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

  try {
    const url = "https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/liquidacion";
    const response = yield http.post(
      "https://cors-anywhere.herokuapp.com/" + url,
      dataFormValues,
    );
    const data = response.data;

    if (response.status === 200) {
      yield call(showNotification, { type: 'success', message: 'Visualiza la lista de productos' });
      yield put({ type: SECURE_CAR_SUCCESS, response: { ...data.data }, });

    } else if (response.status === 400) {
      if (data.dataHeader.errores[0].idError === 1000) {
        yield call(showNotification, { type: 'warning', message: 'La placa y el modelo no concuerdan' });

      } else {
        yield call(showNotification, { type: 'warning', message: data.dataHeader.errores[0].descError });

      }
      yield put({ type: SECURE_CAR_FAILURE, response: { ...data.dataHeader.errores[0] }, });

    } else if (response.status === 500 || response.status === 504) {
      yield call(showNotification, { type: 'warning', message: 'Error en la liquidación, por favor inténtelo nuevamente.' });
      yield put({ type: SECURE_CAR_FAILURE, response: { ...data.dataHeader }, });

    } else {
      yield call(showNotification, { type: 'warning', message: 'Error en la liquidación' });
      yield put({ type: SECURE_CAR_FAILURE, response: { ...data.dataHeader }, });

    }
  } catch (err) {
    yield call(showNotification, { type: 'warning', message: 'Error en la liquidación' });
    yield put({ type: SECURE_CAR_FAILURE, response: {}, });
  }
}

function* getQuotation(formValues) {
  const {
    vehicle,
    brand,
    model,
    name,
    lastName,
    identificationType,
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

  yield put({ type: SECURE_CAR_SUCCESS, response: { ...resOne.data } });
}

function* getCities() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("x-api-key", API_KEY);

  var raw = JSON.stringify({ "claveAsesor": PASSWORD_ASESOR });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const url = "https://stg-api-conecta.segurosbolivar.com/stage/listaCiudades?x-api-key=UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp&claveAsesor=29528&Content-Type=application/json";
  const response = yield fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions);
  const data = yield response.json();

  if (data.dataHeader.codRespuesta === 200) {
    yield put({ type: GET_CITIES_SUCCESS, response: [...data.data.catalogoDato], });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de ciudades' });
    yield put({ type: GET_CITIES_FAILURE, response: { ...data }, });
  }
}

export function* secureCarWatcher() {
  yield takeLatest(SECURE_CAR, secureCar)
  yield takeLatest(GET_CITIES, getCities)
}
