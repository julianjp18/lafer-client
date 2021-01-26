import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_PQRCONTACTS,
  DELETE_PQRCONTACTS,
  GET_PQRCONTACTS,
  GET_PQRCONTACTS_FAILURE,
  UPDATE_PQRCONTACTS,
  GET_PQRCONTACTS_SUCCESS,
  CREATE_PQRCONTACTS_FAILURE,
  CREATE_PQRCONTACTS_SUCCESS,
  UPDATE_PQRCONTACTS_FAILURE,
  UPDATE_PQRCONTACTS_SUCCESS,
  DELETE_PQRCONTACTS_SUCCESS,
  DELETE_PQRCONTACTS_FAILURE,
  GET_PQRCONTACTS_BY_ID,
  GET_PQRCONTACTS_BY_ID_SUCCESS,
  GET_PQRCONTACTS_BY_ID_FAILURE,
} from "../../../constants";

function* getAllPQRContacts() {
  const response = yield http.get("/PQRContacts");

  if (response.status === 200) {
    yield put({ type: GET_PQRCONTACTS_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_PQRCONTACTS_FAILURE, response: {}, });
  }
};

function* createPQRContacts(formValues) {
  const { identificaction, fullName, email, movil, comment, fileAnnex, initialDate } = formValues.payload;
  const response = yield http.post("/PQRContacts", {
    identificaction: identificaction,
    fullName: fullName,
    email: email,
    movil: movil,
    comment: comment,
    fileAnnex: fileAnnex,
    initialDate: initialDate,
  });

  if (response.status === 201) {
    yield getAllPQRContacts();
    yield put({ type: CREATE_PQRCONTACTS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_PQRCONTACTS_FAILURE, response: {}, });
  }
};

function* getPQRContactsById(formValues) {
  const { pqrContactID } = formValues.payload;
  const response = yield http.get(`/PQRContacts/${pqrContactID}`);

  if (response.status === 200) {
    yield getAllPQRContacts();
    yield put({ type: GET_PQRCONTACTS_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_PQRCONTACTS_BY_ID_FAILURE, response: {}, });
  }
};

function* updatePQRContacts(formValues) {
  const { pqrContactID, identificaction, fullName, email, movil, comment, fileAnnex, initialDate } = formValues.payload;
  const response = yield http.put(`/PQRContacts/${pqrContactID}`, {
    pqrContactID: Number.parseInt(pqrContactID),
    identificaction: identificaction,
    fullName: fullName,
    email: email,
    movil: movil,
    comment: comment,
    fileAnnex: fileAnnex,
    initialDate: initialDate,
  });

  if (response.status === 200) {
    yield getAllPQRContacts();
    yield put({ type: UPDATE_PQRCONTACTS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_PQRCONTACTS_FAILURE, response: {}, });
  }
};

function* removePQRContacts(formValues) {
  const { pqrContactID } = formValues.payload;
  const response = yield http.delete(`/PQRContacts/${pqrContactID}`);

  if (response.status === 200) {
    yield getAllPQRContacts();
    yield put({ type: DELETE_PQRCONTACTS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_PQRCONTACTS_FAILURE, response: {}, });
  }
};

export function* PQRContactsWatcher() {
  yield takeLatest(CREATE_PQRCONTACTS, createPQRContacts)
  yield takeLatest(GET_PQRCONTACTS, getAllPQRContacts)
  yield takeLatest(UPDATE_PQRCONTACTS, updatePQRContacts)
  yield takeLatest(DELETE_PQRCONTACTS, removePQRContacts)
  yield takeLatest(GET_PQRCONTACTS_BY_ID, getPQRContactsById)
}
