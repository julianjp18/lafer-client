import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_TYPEOPERATIONS,
  DELETE_TYPEOPERATIONS,
  GET_TYPEOPERATIONS,
  GET_TYPEOPERATIONS_FAILURE,
  UPDATE_TYPEOPERATIONS,
  GET_TYPEOPERATIONS_SUCCESS,
  CREATE_TYPEOPERATIONS_FAILURE,
  CREATE_TYPEOPERATIONS_SUCCESS,
  UPDATE_TYPEOPERATIONS_FAILURE,
  UPDATE_TYPEOPERATIONS_SUCCESS,
  DELETE_TYPEOPERATIONS_SUCCESS,
  DELETE_TYPEOPERATIONS_FAILURE,
  GET_TYPEOPERATIONS_BY_ID,
  GET_TYPEOPERATIONS_BY_ID_SUCCESS,
  GET_TYPEOPERATIONS_BY_ID_FAILURE,
} from "../../../constants";

function* getAllTypeOperations () {
  const response = yield http.get("/TypeOperations");
  if (response.status === 200) {
    yield put({ type: GET_TYPEOPERATIONS_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_TYPEOPERATIONS_FAILURE, response: {}, });
  }
};

function* createTypeOperations (formValues) {
  const { nameOperations } = formValues.payload;
  const response = yield http.post("/TypeOperations",{
    nameOperations: nameOperations,
  });
  
  if (response.status === 201) {
    yield getAllTypeOperations();
    yield put({ type: CREATE_TYPEOPERATIONS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_TYPEOPERATIONS_FAILURE, response: {}, });
  }
};

function* getTypeOperationsById (formValues) {
  const { typeOperationID } = formValues.payload;
  const response = yield http.get(`/TypeOperations/${typeOperationID}`);
  
  if (response.status === 200) {
    yield getAllTypeOperations();
    yield put({ type: GET_TYPEOPERATIONS_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_TYPEOPERATIONS_BY_ID_FAILURE, response: {}, });
  }
};

function* updateTypeOperations (formValues) {
  const { typeOperationID, nameOperations } = formValues.payload;
  const response = yield http.put(`/TypeOperations/${typeOperationID}`,{
    typeOperationID: Number.parseInt(typeOperationID),
    nameOperations: nameOperations,
  });
  
  if (response.status === 200) {
    yield getAllTypeOperations();
    yield put({ type: UPDATE_TYPEOPERATIONS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_TYPEOPERATIONS_FAILURE, response: {}, });
  }
};

function* removeTypeOperations(formValues) {
  const { typeOperationID } = formValues.payload;
  const response = yield http.delete(`/TypeOperations/${typeOperationID}`);
  
  if (response.status === 200) {
    yield getAllTypeOperations();
    yield put({ type: DELETE_TYPEOPERATIONS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_TYPEOPERATIONS_FAILURE, response: {}, });
  }
};

export function* typeOperationsWatcher() {
  yield takeLatest(CREATE_TYPEOPERATIONS, createTypeOperations)
  yield takeLatest(GET_TYPEOPERATIONS, getAllTypeOperations)
  yield takeLatest(UPDATE_TYPEOPERATIONS, updateTypeOperations)
  yield takeLatest(DELETE_TYPEOPERATIONS, removeTypeOperations)
  yield takeLatest(GET_TYPEOPERATIONS_BY_ID, getTypeOperationsById)
}
