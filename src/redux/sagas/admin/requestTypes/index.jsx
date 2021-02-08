import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_REQUESTTYPES,
  DELETE_REQUESTTYPES,
  GET_REQUESTTYPES,
  GET_REQUESTTYPES_FAILURE,
  UPDATE_REQUESTTYPES,
  GET_REQUESTTYPES_SUCCESS,
  CREATE_REQUESTTYPES_FAILURE,
  CREATE_REQUESTTYPES_SUCCESS,
  UPDATE_REQUESTTYPES_FAILURE,
  UPDATE_REQUESTTYPES_SUCCESS,
  DELETE_REQUESTTYPES_SUCCESS,
  DELETE_REQUESTTYPES_FAILURE,
  GET_REQUESTTYPES_BY_ID,
  GET_REQUESTTYPES_BY_ID_SUCCESS,
  GET_REQUESTTYPES_BY_ID_FAILURE,
} from "../../../constants";

function* getAllRequestTypes() {
  const response = yield http.get("/RequestTypes");

  if (response.status === 200) {
    yield put({ type: GET_REQUESTTYPES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_REQUESTTYPES_FAILURE, response: {}, });
  }
};

function* createRequestTypes(formValues) {
  const { requestName } = formValues.payload;
  const response = yield http.post("/RequestTypes", {
    requestName: requestName
  });

  if (response.status === 201) {
    yield getAllRequestTypes();
    yield put({ type: CREATE_REQUESTTYPES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_REQUESTTYPES_FAILURE, response: {}, });
  }
};

function* getRequestTypesById(formValues) {
  const { requestTypeID } = formValues.payload;
  const response = yield http.get(`/RequestTypes/${requestTypeID}`);

  if (response.status === 200) {
    yield getAllRequestTypes();
    yield put({ type: GET_REQUESTTYPES_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_REQUESTTYPES_BY_ID_FAILURE, response: {}, });
  }
};

function* updateRequestTypes(formValues) {
  const { requestTypeID, requestName } = formValues.payload;
  const response = yield http.put(`/RequestTypes/${requestTypeID}`, {
    requestTypeID: Number.parseInt(requestTypeID),
    requestName: requestName,
  });

  if (response.status === 200) {
    yield getAllRequestTypes();
    yield put({ type: UPDATE_REQUESTTYPES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_REQUESTTYPES_FAILURE, response: {}, });
  }
};

function* removeRequestTypes(formValues) {
  const { requestTypeID } = formValues.payload;
  const response = yield http.delete(`/RequestTypes/${requestTypeID}`);

  if (response.status === 200) {
    yield getAllRequestTypes();
    yield put({ type: DELETE_REQUESTTYPES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_REQUESTTYPES_FAILURE, response: {}, });
  }
};

export function* requestTypesWatcher() {
  yield takeLatest(CREATE_REQUESTTYPES, createRequestTypes)
  yield takeLatest(GET_REQUESTTYPES, getAllRequestTypes)
  yield takeLatest(UPDATE_REQUESTTYPES, updateRequestTypes)
  yield takeLatest(DELETE_REQUESTTYPES, removeRequestTypes)
  yield takeLatest(GET_REQUESTTYPES_BY_ID, getRequestTypesById)
}
