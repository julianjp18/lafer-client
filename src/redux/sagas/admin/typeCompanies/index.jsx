import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_TYPECOMPANIES,
  DELETE_TYPECOMPANIES,
  GET_TYPECOMPANIES,
  GET_TYPECOMPANIES_FAILURE,
  UPDATE_TYPECOMPANIES,
  GET_TYPECOMPANIES_SUCCESS,
  CREATE_TYPECOMPANIES_FAILURE,
  CREATE_TYPECOMPANIES_SUCCESS,
  UPDATE_TYPECOMPANIES_FAILURE,
  UPDATE_TYPECOMPANIES_SUCCESS,
  DELETE_TYPECOMPANIES_SUCCESS,
  DELETE_TYPECOMPANIES_FAILURE,
  GET_TYPECOMPANIES_BY_ID,
  GET_TYPECOMPANIES_BY_ID_SUCCESS,
  GET_TYPECOMPANIES_BY_ID_FAILURE,
} from "../../../constants";

function* getAllTypeCompanies () {
  const response = yield http.get("/TypeCompanies");
  if (response.status === 200) {
    yield put({ type: GET_TYPECOMPANIES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_TYPECOMPANIES_FAILURE, response: {}, });
  }
};

function* createTypeCompanies (formValues) {
  const { company } = formValues.payload;
  const response = yield http.post("/TypeCompanies",{
    company: company,
  });
  
  if (response.status === 201) {
    yield getAllTypeCompanies();
    yield put({ type: CREATE_TYPECOMPANIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_TYPECOMPANIES_FAILURE, response: {}, });
  }
};

function* getTypeCompaniesById (formValues) {
  const { typeCompanyID } = formValues.payload;
  const response = yield http.get(`/TypeCompanies/${typeCompanyID}`);
  
  if (response.status === 200) {
    yield getAllTypeCompanies();
    yield put({ type: GET_TYPECOMPANIES_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_TYPECOMPANIES_BY_ID_FAILURE, response: {}, });
  }
};

function* updateTypeCompanies (formValues) {
  const { typeCompanyID, company } = formValues.payload;
  const response = yield http.put(`/TypeCompanies/${typeCompanyID}`,{
    typeCompanyID: Number.parseInt(typeCompanyID),
    company: company,
  });
  
  if (response.status === 200) {
    yield getAllTypeCompanies();
    yield put({ type: UPDATE_TYPECOMPANIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_TYPECOMPANIES_FAILURE, response: {}, });
  }
};

function* removeTypeCompanies(formValues) {
  const { typeCompanyID } = formValues.payload;
  const response = yield http.delete(`/TypeCompanies/${typeCompanyID}`);
  
  if (response.status === 200) {
    yield getAllTypeCompanies();
    yield put({ type: DELETE_TYPECOMPANIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_TYPECOMPANIES_FAILURE, response: {}, });
  }
};

export function* typeCompaniesWatcher() {
  yield takeLatest(CREATE_TYPECOMPANIES, createTypeCompanies)
  yield takeLatest(GET_TYPECOMPANIES, getAllTypeCompanies)
  yield takeLatest(UPDATE_TYPECOMPANIES, updateTypeCompanies)
  yield takeLatest(DELETE_TYPECOMPANIES, removeTypeCompanies)
  yield takeLatest(GET_TYPECOMPANIES_BY_ID, getTypeCompaniesById)
}
