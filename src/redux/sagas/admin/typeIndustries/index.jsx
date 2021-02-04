import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_TYPEINDUSTRIES,
  DELETE_TYPEINDUSTRIES,
  GET_TYPEINDUSTRIES,
  GET_TYPEINDUSTRIES_FAILURE,
  UPDATE_TYPEINDUSTRIES,
  GET_TYPEINDUSTRIES_SUCCESS,
  CREATE_TYPEINDUSTRIES_FAILURE,
  CREATE_TYPEINDUSTRIES_SUCCESS,
  UPDATE_TYPEINDUSTRIES_FAILURE,
  UPDATE_TYPEINDUSTRIES_SUCCESS,
  DELETE_TYPEINDUSTRIES_SUCCESS,
  DELETE_TYPEINDUSTRIES_FAILURE,
  GET_TYPEINDUSTRIES_BY_ID,
  GET_TYPEINDUSTRIES_BY_ID_SUCCESS,
  GET_TYPEINDUSTRIES_BY_ID_FAILURE,
} from "../../../constants";

function* getAllTypeIndustries() {
  const response = yield http.get("/TypeIndustries");
  if (response.status === 200) {
    yield put({ type: GET_TYPEINDUSTRIES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_TYPEINDUSTRIES_FAILURE, response: {}, });
  }
};

function* createTypeIndustries(formValues) {
  const { industry } = formValues.payload;
  const response = yield http.post("/TypeIndustries", {
    industry: industry,
  });

  if (response.status === 201) {
    yield getAllTypeIndustries();
    yield put({ type: CREATE_TYPEINDUSTRIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_TYPEINDUSTRIES_FAILURE, response: {}, });
  }
};

function* getTypeIndustriesById(formValues) {
  const { typeIndustryID } = formValues.payload;
  const response = yield http.get(`/TypeIndustries/${typeIndustryID}`);

  if (response.status === 200) {
    yield getAllTypeIndustries();
    yield put({ type: GET_TYPEINDUSTRIES_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_TYPEINDUSTRIES_BY_ID_FAILURE, response: {}, });
  }
};

function* updateTypeIndustries(formValues) {
  const { typeIndustryID, industry } = formValues.payload;
  const response = yield http.put(`/TypeIndustries/${typeIndustryID}`, {
    typeIndustryID: Number.parseInt(typeIndustryID),
    industry: industry,
  });

  if (response.status === 200) {
    yield getAllTypeIndustries();
    yield put({ type: UPDATE_TYPEINDUSTRIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_TYPEINDUSTRIES_FAILURE, response: {}, });
  }
};

function* removeTypeIndustries(formValues) {
  const { typeIndustryID } = formValues.payload;
  const response = yield http.delete(`/TypeIndustries/${typeIndustryID}`);

  if (response.status === 200) {
    yield getAllTypeIndustries();
    yield put({ type: DELETE_TYPEINDUSTRIES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_TYPEINDUSTRIES_FAILURE, response: {}, });
  }
};

export function* typeIndustriesWatcher() {
  yield takeLatest(CREATE_TYPEINDUSTRIES, createTypeIndustries)
  yield takeLatest(GET_TYPEINDUSTRIES, getAllTypeIndustries)
  yield takeLatest(UPDATE_TYPEINDUSTRIES, updateTypeIndustries)
  yield takeLatest(DELETE_TYPEINDUSTRIES, removeTypeIndustries)
  yield takeLatest(GET_TYPEINDUSTRIES_BY_ID, getTypeIndustriesById)
}
