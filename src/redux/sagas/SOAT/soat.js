import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';

const createLead = async (dataFormValues) => {
  const {
    typeVehicle, //VALOR $$
    line,
    classVehicle,
    model,
    plate,  //Placa
    brand,
    identificationType,
    phoneNumber,
    name,
    lastName,
    email,
    address,
    city,
    identification,
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
            city: city,
            street: address,
            phoneNumber: phoneNumber,
            identificacion_6010175c91f14: identificationType,
            placa_600763145ae42: plate,
            modelo_601019a742dcd: model,
            marca_6010193d75a00: brand,
            numeroid_6010179c38d01: identification,
            preciosoat_6014802814e37: typeVehicle,
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

  console.log("Perfecto");

  const url = "https://api.sharpspring.com/pubapi/v1/?accountID=76FD61825495DAC83BD6A631F10B3E91&secretKey=08F1969173F67ABD5FB267D6E2547FB5"
  fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
    .then(response => response.text())
    .then((result) => {
      console.log(result);
      const idLeadSharp = JSON.parse(result).result.creates[0].id;
      console.log(idLeadSharp)
      localStorage.setItem('ID', idLeadSharp)
      var list = JSON.stringify(
        {
          "method": "addListMember",
          "params": {
            "listID": "3670574082",
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
          console.log("Envío acontacto desde SOAT 3er paso");
        })
    })
    .catch(error => console.log('error', error));
}

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
    startDate: "2020-12-25T08:44:53.510Z",
    endDate: "2021-12-24T08:44:53.510Z",
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

  createLead({
    typeVehicle,
    line,
    classVehicle,
    model,
    plate,
    brand,
    identificationType,
    phoneNumber,
    name,
    lastName,
    email,
    address,
    city,
    identification,
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
