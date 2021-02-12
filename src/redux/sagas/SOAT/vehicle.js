import { put, takeLatest } from 'redux-saga/effects';
import { VEHICLE_INFO, VEHICLE_INFO_SUCCESS } from '../../constants';

function* vehicle(formValues) {
    const { identificationType } = formValues.payload;
    const { identification } = formValues.payload;
    const { name } = formValues.payload;
    const { lastName } = formValues.payload;
    const { email } = formValues.payload;
    const { cityName } = formValues.payload;
    const { address } = formValues.payload;
    const { idLeadSharp } = formValues.payload;

    yield put({ type: VEHICLE_INFO_SUCCESS, vehicle_info: formValues.payload, });
}

export function* vehicleWatcher() {
    yield takeLatest(VEHICLE_INFO, vehicle);
}
