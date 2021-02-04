import { put, takeLatest } from 'redux-saga/effects';
import {PropTypes} from 'prop-types';

const createLead = async (dataFormValues) => {
    const {
        identificationType,
        identification,
        name,
        lastName,
        email,
        cityName,
        address,
        idLeadSharp,
    } = dataFormValues;

    console.log(idLeadSharp);

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Access-Control-Allow-Origin", "*");

    // var raw = JSON.stringify(
    //     {
    //         "method": "createLeads",
    //         "params":
    //         {
    //             "objects": [
    //                 {
    //                     firstName: name,
    //                     lastName: lastName,
    //                     emailAddress: email,
    //                     city: cityName,
    //                     street: address,
    //                     identificacion_6010175c91f14: identificationType,
    //                     numeroid_6010179c38d01: identification,
    //                 }
    //             ]
    //         },
    //         "id": `123${identification}`
    //     }
    // );

    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    // };

    // const url = "https://api.sharpspring.com/pubapi/v1/?accountID=76FD61825495DAC83BD6A631F10B3E91&secretKey=08F1969173F67ABD5FB267D6E2547FB5"
    // fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         const idLeadSharp = JSON.parse(result).result.creates[0].id;
    //         console.log(JSON.parse(result).result.creates[0].id)
    //         var list = JSON.stringify(
    //             {
    //                 "method": "addListMember",
    //                 "params": {
    //                     "listID": "3670574082",
    //                     "memberID": idLeadSharp
    //                 },
    //                 "id": `123${identification}`
    //             }
    //         );
    //         var requestList = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: list,
    //         };
    //         fetch("https://cors-anywhere.herokuapp.com/" + url, requestList)
    //             .then(response => response.text())
    //             .then(result => {
    //                 console.log("Envío exitoso SOAT 2do PASO");
    //             })
    //     })
    //     .catch(error => console.log('error', error));
}

function* vehicle(formValues) {
    const { identificationType } = formValues.payload;
    const { identification } = formValues.payload;
    const { name } = formValues.payload;
    const { lastName } = formValues.payload;
    const { email } = formValues.payload;
    const { cityName } = formValues.payload;
    const { address } = formValues.payload;
    const { idLeadSharp } = formValues.payload;

    createLead({
        identificationType,
        identification,
        name,
        lastName,
        email,
        cityName,
        address,
        idLeadSharp,
    });

    yield put({ type: "VEHICLE_INFO_SUCCESS", vehicle_info: formValues.payload, });
}

export function* vehicleWatcher() {
    yield takeLatest('VEHICLE_INFO', vehicle);
}
