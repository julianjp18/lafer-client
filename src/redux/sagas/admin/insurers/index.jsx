import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_INSURERS,
  DELETE_INSURERS,
  GET_INSURERS,
  GET_INSURERS_FAILURE,
  UPDATE_INSURERS,
  GET_INSURERS_SUCCESS,
  CREATE_INSURERS_FAILURE,
  CREATE_INSURERS_SUCCESS,
  UPDATE_INSURERS_FAILURE,
  UPDATE_INSURERS_SUCCESS,
  DELETE_INSURERS_SUCCESS,
  DELETE_INSURERS_FAILURE,
  GET_INSURERS_BY_ID,
  GET_INSURERS_BY_ID_SUCCESS,
  GET_INSURERS_BY_ID_FAILURE,
} from "../../../constants";


function* getAllInsurers() {
  const response = yield http.get("/Insurers");

  if (response.status === 200) {
    yield put({ type: GET_INSURERS_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_INSURERS_FAILURE, response: {}, });
  }
};

function* createInsurers(formValues) {
  const { insurerName, contact, movil, logo, email } = formValues.payload;
  const response = yield http.post("/Insurers", {
    insurerName: insurerName,
    contact: contact,
    movil: movil,
    logo: logo,
    email: email
  });

  if (response.status === 201) {
    yield getAllInsurers();
    yield put({ type: CREATE_INSURERS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_INSURERS_FAILURE, response: {}, });
  }
};

function* getInsurersById(formValues) {
  const { id } = formValues.payload;
  const response = yield http.get(`/Insurers/${id}`);

  if (response.status === 200) {
    yield getAllInsurers();
    yield put({ type: GET_INSURERS_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_INSURERS_BY_ID_FAILURE, response: {}, });
  }
};

function* updateInsurers(formValues) {
  const { id, insurerName, contact, movil, logo, email } = formValues.payload;
  const response = yield http.put(`/Insurers/${id}`, {
    id: Number.parseInt(id),
    insurerName: insurerName,
    contact: contact,
    movil: movil,
    logo: logo,
    email: email,
  });

  if (response.status === 200) {
    yield getAllInsurers();
    yield put({ type: UPDATE_INSURERS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_INSURERS_FAILURE, response: {}, });
  }
};

function* removeInsurers(formValues) {
  const { id } = formValues.payload;
  const response = yield http.delete(`/Insurers/${id}`);

  if (response.status === 200) {
    yield getAllInsurers();
    yield put({ type: DELETE_INSURERS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_INSURERS_FAILURE, response: {}, });
  }
};

export function* insurersWatcher() {
  yield takeLatest(CREATE_INSURERS, createInsurers)
  yield takeLatest(GET_INSURERS, getAllInsurers)
  yield takeLatest(UPDATE_INSURERS, updateInsurers)
  yield takeLatest(DELETE_INSURERS, removeInsurers)
  yield takeLatest(GET_INSURERS_BY_ID, getInsurersById)
}
