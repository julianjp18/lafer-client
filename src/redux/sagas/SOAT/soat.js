import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import showNotification from '../../showNotification';
import { BUY_SOAT, BUY_SOAT_FAILURE, BUY_SOAT_FORM, BUY_SOAT_FORM_FAILURE, BUY_SOAT_FORM_SUCCESS, BUY_SOAT_SUCCESS } from '../../constants';

const createLead = async (dataFormValues) => {
  const {
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
    idLeadSharp,
  } = dataFormValues;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");

  var raw = JSON.stringify(
    {
      "id": `123${identification}`,
      "method": "updateLeads",
      "params": {
        "objects": [
          {
            "id": idLeadSharp,
            "compra_soat_602ab17697fee": "Comprado",
          }
        ]
      }
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const url = "https://api.sharpspring.com/pubapi/v1/?accountID=76FD61825495DAC83BD6A631F10B3E91&secretKey=08F1969173F67ABD5FB267D6E2547FB5";

  return await fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
    .then(response => response.text())
    .then(result => {
      var list = JSON.stringify(
        {
          "method": "addListMember",
          "params": {
            "listID": "3676804098",
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

          var removelist = JSON.stringify(
            {
              "method": "removeListMember",
              "params": {
                "where": {
                  "listID": "3676803074",
                  "contactID": idLeadSharp
                }
              },
              "id": `123${identification}`
            }
          );

          var requestRemoveList = {
            method: 'POST',
            headers: myHeaders,
            body: removelist,
          };

          fetch("https://cors-anywhere.herokuapp.com/" + url, requestRemoveList)
            .then(response => response.text())
            .then(result => {
            });

          return idLeadSharp;
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
    yield put({ type: BUY_SOAT_SUCCESS, buy_soat: { ...data[0], username }, });
  } else {
    yield call(showNotification, { type: 'warning', message: data[0].message });
    yield put({ type: BUY_SOAT_FAILURE, response: { ...data[0], username }, });
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
    idLeadSharp,
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
    idLeadSharp,
  });

  yield call(showNotification, { type: 'success', message: 'Adquiriste tu SOAT, continua a pagarlo' });

  if (data[0].status !== 'Error') {
    yield call(showNotification, { type: 'success', message: 'Adquiriste tu SOAT, continua a pagarlo' });
    yield put({ type: BUY_SOAT_FORM_SUCCESS, response: { formValues }, });
  } else {
    yield call(showNotification, { type: 'warning', message: data[0].message });
    yield put({ type: BUY_SOAT_FORM_FAILURE, response: { ...data[0] }, });
  }

}

export function* soatWatcher() {
  yield takeLatest(BUY_SOAT, buySoat)
  yield takeLatest(BUY_SOAT_FORM, buySoatForm)
}
