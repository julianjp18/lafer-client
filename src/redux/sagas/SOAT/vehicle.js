import { put, takeLatest } from 'redux-saga/effects';

function* vehicle(formValues) {
    console.log(formValues);
    yield put({ type: "VEHICLE_INFO_SUCCESS", vehicle_info: formValues.payload, });
}

export function* vehicleWatcher() {
    yield takeLatest('VEHICLE_INFO', vehicle);
}
