import { put, takeLatest } from 'redux-saga/effects';
import { VEHICLE_INFO, VEHICLE_INFO_SUCCESS } from '../../constants';

const createLead = async (dataFormValues) => {
    const {
        brand,
        line,
        model,
        typeVehicle,
        classVehicle,
        identification,
        idLeadSharp,
    } = dataFormValues;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");

    var raw = JSON.stringify(
        {
            "id": "1234",
            "method": "updateLeads",
            "params": {
                "objects": [
                    {
                        "id": idLeadSharp,
                        "marca_6010193d75a00": brand,
                        "clase_vehiculo_602a82666a7f3": classVehicle,
                        "linea_602a834ac4e41": line,
                        "modelo_601019a742dcd": model,
                        "precio_602a84d510cb3": typeVehicle,
                    }
                ]
            }
        }
    );

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    const url = "https://api.sharpspring.com/pubapi/v1/?accountID=76FD61825495DAC83BD6A631F10B3E91&secretKey=08F1969173F67ABD5FB267D6E2547FB5";
    return await fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
        .then(response => response.text())
        .then(async (result) => {
            var list = JSON.stringify(
                {
                    "method": "addListMember",
                    "params": {
                        "listID": "3676802050",
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
                });
            return idLeadSharp;
        })
        .catch(error => console.log('error', error));
}

function* vehicle(formValues) {

    const { identificationType } = formValues.payload;
    const { identification } = formValues.payload;
    const { name } = formValues.payload;
    const { lastName } = formValues.payload;
    const { email } = formValues.payload;
    const { cityName } = formValues.payload;
    const { address } = formValues.payload;
    const { phone } = formValues.payload;
    const { brand } = formValues.payload;
    const { line } = formValues.payload;
    const { model } = formValues.payload;
    const { typeVehicle } = formValues.payload;
    const { classVehicle } = formValues.payload;
    const { idLeadSharp } = formValues.payload;

    createLead({
        brand,
        line,
        model,
        typeVehicle,
        classVehicle,
        identification,
        idLeadSharp,
    })

    yield put({ type: VEHICLE_INFO_SUCCESS, vehicle_info: formValues.payload });
}

export function* vehicleWatcher() {
    yield takeLatest(VEHICLE_INFO, vehicle);
}
