import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios/index";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_COUNTRY,
  DELETE_COUNTRY,
  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  UPDATE_COUNTRY,
  GET_COUNTRIES_SUCCESS,
  CREATE_COUNTRY_FAILURE,
  CREATE_COUNTRY_SUCCESS,
  UPDATE_COUNTRY_FAILURE,
  UPDATE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_FAILURE,
  GET_COUNTRY_BY_ID,
  GET_COUNTRY_BY_ID_SUCCESS,
  GET_COUNTRY_BY_ID_FAILURE,
} from "../../../constants";

function* getAll () {
  const response = yield http.get("/Countries");

  if (response.status === 200) {
    yield put({ type: GET_COUNTRIES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista de países' });
    yield put({ type: GET_COUNTRIES_FAILURE, response: {}, });
  }
};

function* createCountry (formValues) {
  const { countryName } = formValues.payload;
  const response = yield http.post("/Countries",{
    CountryName: countryName,
  });
  
  if (response.status === 201) {
    yield getAll();
    yield put({ type: CREATE_COUNTRY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó el pais correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación de países' });
    yield put({ type: CREATE_COUNTRY_FAILURE, response: {}, });
  }
};

function* getCountryById (formValues) {
  const { countryId } = formValues.payload;
  const response = yield http.get(`/Countries/${countryId}`);
  
  if (response.status === 200) {
    yield getAll();
    yield put({ type: GET_COUNTRY_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'País obtenido' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención del países' });
    yield put({ type: GET_COUNTRY_BY_ID_FAILURE, response: {}, });
  }
};

function* updateCountry (formValues) {
  const { countryId, countryName } = formValues.payload;
  const response = yield http.put(`/Countries/${countryId}`,{
    countryId: Number.parseInt(countryId),
    countryName: countryName,
  });
  
  if (response.status === 200) {
    yield getAll();
    yield put({ type: UPDATE_COUNTRY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó el pais correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar el país.' });
    yield put({ type: UPDATE_COUNTRY_FAILURE, response: {}, });
  }
};

function* removeCountry(formValues) {
  const { countryId } = formValues.payload;
  const response = yield http.delete(`/Countries/${countryId}`);
  
  if (response.status === 200) {
    yield getAll();
    yield put({ type: DELETE_COUNTRY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó el pais correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar el país.' });
    yield put({ type: DELETE_COUNTRY_FAILURE, response: {}, });
  }
};

export function* countriesWatcher() {
  yield takeLatest(CREATE_COUNTRY, createCountry)
  yield takeLatest(GET_COUNTRIES, getAll)
  yield takeLatest(UPDATE_COUNTRY, updateCountry)
  yield takeLatest(DELETE_COUNTRY, removeCountry)
  yield takeLatest(GET_COUNTRY_BY_ID, getCountryById)
}
