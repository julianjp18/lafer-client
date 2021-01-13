import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import http from "../../../axios";
import showNotification from "../../../redux/showNotification";
import {
  CREATE_COUNTRY,
  DELETE_COUNTRY,
  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  UPDATE_COUNTRY,
  GET_COUNTRIES_SUCCESS,
} from "../constants";

function* getAll () {
  const response = yield http.get("/Countries");

  if (response.status === 200) {
    yield put({ type: GET_COUNTRIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Lista de paises correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista de países' });
    yield put({ type: GET_COUNTRIES_FAILURE, response: {}, });
  }
};

function* getCountry (id) {
  const response = yield http.get(`/Countries/${id}`);
  const data = yield response.json();

  return data;
};

function* createCountry (formValues) {
  const response = yield http.post("/Countries", formValues);
  const data = yield response.json();

  return data;
};

function* updateCountry (id, formValues) {
  const response = yield http.put(`/Countries/${id}`, formValues);
  const data = yield response.json();

  return data;
};

function* removeCountry(id) {
  const response = yield http.delete(`/Countries/${id}`);
  const data = yield response.json();

  return data;
};


/**
 * ONLY FOR ACADEMIC PURPOSES
 * PLEASE DON'T USE
 */
function* removeAll () {
  const response = yield http.delete(`/countries`);
  const data = yield response.json();

  return data;
};

/**
 * ONLY FOR ACADEMIC PURPOSES
 */
const findCountryByName = async (title) => {
  const response = await http.get(`/Countries?name=${title}`);
  const data = await response.json();

  return data;
};

export function* exampleWatcher() {
  yield takeLatest(GET_COUNTRIES, getAll)
  yield takeLatest(UPDATE_COUNTRY, updateCountry)
  yield takeLatest(DELETE_COUNTRY, removeCountry)
  yield takeLatest(CREATE_COUNTRY, createCountry)
}
