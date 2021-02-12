import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { message } from 'antd';
import showNotification from '../../showNotification';
import { CLIENT_INFO, MAIN_INFO, MAIN_INFO_FAILURE, MAIN_INFO_SUCCESS } from '../../constants';

const createLead = async (dataFormValues) => {
  const {
    vehicle,
    identification,
    phone,
    brand,
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
            emailAddress: `${identification}@gmail.com`,
            phoneNumber: phone,
            placa_600763145ae42: vehicle,
            marca_6010193d75a00: brand,
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

  const id = [];
  const url = "https://api.sharpspring.com/pubapi/v1/?accountID=76FD61825495DAC83BD6A631F10B3E91&secretKey=08F1969173F67ABD5FB267D6E2547FB5";
  return await fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
    .then(response => response.text())
    .then(async (result) => {
      const idLeadSharp = JSON.parse(result).result.creates[0].id;
      id.push(idLeadSharp);
      
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
          console.log("Envío exitoso SOAT");
        });

        return idLeadSharp;
    })
    .catch(error => console.log('error', error));
}

function* client(formValues) {
  // ACÁ DEBE IR EL OTRO ENDPOINT DE SHARPSPRING
  yield put({ type: "CLIENT_INFO_SUCCESS", client_info: formValues.payload, });
}

function* mainInfo(formValues) {
  const { identification } = formValues.payload;
  const { vehicle } = formValues.payload;
  const { phone } = formValues.payload;
  const { brand } = formValues.payload;
  const error = [];
  const data = [];

  const idLeadSharp = createLead({
    vehicle,
    identification,
    phone,
    brand,
  });

  const idLead = [];
  yield idLeadSharp.then((res) => idLead.push(res));

  yield axios.post(`https://lafersegurosapi.azurewebsites.net/api/Costumers/${identification}`, {
    "accept": "*/*",
    "Access-Control-Allow-Origin": "*",
  }).then((response) => {
    data.push(response);
  }).catch(e => {
    localStorage.setItem('client-data-soat', '');
    error.push(e);
  });

  if (error.length === 0) {
    localStorage.setItem('client-data-soat', JSON.stringify(data[0].data));
    message.success('!Datos correctos!');
    //yield call(showNotification, { type: 'success', message: 'Datos correctos' });
    yield put({ type: MAIN_INFO_SUCCESS, response: { ...data[0].data, idLeadSharp: idLead[0] }});
  } else {
    //message.info('!Por favor completa los datos!');
    yield call(showNotification, { type: 'warning', message: 'Por favor completa la información requerida' });
    yield put({ type: MAIN_INFO_FAILURE, response: {}, idLeadSharp: idLead[0] });
  }
}

export function* clientWatcher() {
  yield takeLatest(CLIENT_INFO, client);
  yield takeLatest(MAIN_INFO, mainInfo);
}
