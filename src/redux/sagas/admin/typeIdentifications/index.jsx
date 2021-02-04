import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_TYPEIDENTIFICATIONS,
  DELETE_TYPEIDENTIFICATIONS,
  GET_TYPEIDENTIFICATIONS,
  GET_TYPEIDENTIFICATIONS_FAILURE,
  UPDATE_TYPEIDENTIFICATIONS,
  GET_TYPEIDENTIFICATIONS_SUCCESS,
  CREATE_TYPEIDENTIFICATIONS_FAILURE,
  CREATE_TYPEIDENTIFICATIONS_SUCCESS,
  UPDATE_TYPEIDENTIFICATIONS_FAILURE,
  UPDATE_TYPEIDENTIFICATIONS_SUCCESS,
  DELETE_TYPEIDENTIFICATIONS_SUCCESS,
  DELETE_TYPEIDENTIFICATIONS_FAILURE,
  GET_TYPEIDENTIFICATIONS_BY_ID,
  GET_TYPEIDENTIFICATIONS_BY_ID_SUCCESS,
  GET_TYPEIDENTIFICATIONS_BY_ID_FAILURE,
} from "../../../constants";

function* getAllTypeIdentifications() {
  const response = yield http.get("/TypeIdentifications");
  if (response.status === 200) {
    yield put({ type: GET_TYPEIDENTIFICATIONS_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_TYPEIDENTIFICATIONS_FAILURE, response: {}, });
  }
};

function* createTypeIdentifications(formValues) {
  const { identification } = formValues.payload;
  const response = yield http.post("/TypeIdentifications", {
    identification: identification,
  });

  if (response.status === 201) {
    yield getAllTypeIdentifications();
    yield put({ type: CREATE_TYPEIDENTIFICATIONS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_TYPEIDENTIFICATIONS_FAILURE, response: {}, });
  }
};

function* getTypeIdentificationsById(formValues) {
  const { typeIdentificationID } = formValues.payload;
  const response = yield http.get(`/TypeIdentifications/${typeIdentificationID}`);

  if (response.status === 200) {
    yield getAllTypeIdentifications();
    yield put({ type: GET_TYPEIDENTIFICATIONS_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_TYPEIDENTIFICATIONS_BY_ID_FAILURE, response: {}, });
  }
};

function* updateTypeIdentifications(formValues) {
  const { typeIdentificationID, identification } = formValues.payload;
  const response = yield http.put(`/TypeIdentifications/${typeIdentificationID}`, {
    typeIdentificationID: Number.parseInt(typeIdentificationID),
    identification: identification,
  });

  if (response.status === 200) {
    yield getAllTypeIdentifications();
    yield put({ type: UPDATE_TYPEIDENTIFICATIONS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_TYPEIDENTIFICATIONS_FAILURE, response: {}, });
  }
};

function* removeTypeIdentifications(formValues) {
  const { typeIdentificationID } = formValues.payload;
  const response = yield http.delete(`/TypeIdentifications/${typeIdentificationID}`);

  if (response.status === 200) {
    yield getAllTypeIdentifications();
    yield put({ type: DELETE_TYPEIDENTIFICATIONS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_TYPEIDENTIFICATIONS_FAILURE, response: {}, });
  }
};

export function* typeIdentificationsWatcher() {
  yield takeLatest(CREATE_TYPEIDENTIFICATIONS, createTypeIdentifications)
  yield takeLatest(GET_TYPEIDENTIFICATIONS, getAllTypeIdentifications)
  yield takeLatest(UPDATE_TYPEIDENTIFICATIONS, updateTypeIdentifications)
  yield takeLatest(DELETE_TYPEIDENTIFICATIONS, removeTypeIdentifications)
  yield takeLatest(GET_TYPEIDENTIFICATIONS_BY_ID, getTypeIdentificationsById)
}
