import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_LINKCLASSES,
  DELETE_LINKCLASSES,
  GET_LINKCLASSES,
  GET_LINKCLASSES_FAILURE,
  UPDATE_LINKCLASSES,
  GET_LINKCLASSES_SUCCESS,
  CREATE_LINKCLASSES_FAILURE,
  CREATE_LINKCLASSES_SUCCESS,
  UPDATE_LINKCLASSES_FAILURE,
  UPDATE_LINKCLASSES_SUCCESS,
  DELETE_LINKCLASSES_SUCCESS,
  DELETE_LINKCLASSES_FAILURE,
  GET_LINKCLASSES_BY_ID,
  GET_LINKCLASSES_BY_ID_SUCCESS,
  GET_LINKCLASSES_BY_ID_FAILURE,
} from "../../../constants";

function* getAllLinkClasses () {
  const response = yield http.get("/LinkClasses");

  if (response.status === 200) {
    yield put({ type: GET_LINKCLASSES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_LINKCLASSES_FAILURE, response: {}, }); 
  }
};

function* createLinkClasses (formValues) {
  const { nameLink, other } = formValues.payload;
  const response = yield http.post("/LinkClasses",{
    nameLink: nameLink,
    other: other,
  });
  
  if (response.status === 201) {
    yield getAllLinkClasses();
    yield put({ type: CREATE_LINKCLASSES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_LINKCLASSES_FAILURE, response: {}, });
  }
};

function* getLinkClassesById (formValues) {
  const { linkClassID } = formValues.payload;
  const response = yield http.get(`/LinkClasses/${linkClassID}`);
  
  if (response.status === 200) {
    yield getAllLinkClasses();
    yield put({ type: GET_LINKCLASSES_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_LINKCLASSES_BY_ID_FAILURE, response: {}, });
  }
};

function* updateLinkClasses (formValues) {
  const { linkClassID, nameLink, other } = formValues.payload;
  const response = yield http.put(`/LinkClasses/${linkClassID}`,{
    linkClassID: Number.parseInt(linkClassID),
    nameLink: nameLink,
    other: other,
  });
  
  if (response.status === 200) {
    yield getAllLinkClasses();
    yield put({ type: UPDATE_LINKCLASSES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_LINKCLASSES_FAILURE, response: {}, });
  }
};

function* removeLinkClasses(formValues) {
  const { linkClassID } = formValues.payload;
  const response = yield http.delete(`/LinkClasses/${linkClassID}`);
  
  if (response.status === 200) {
    yield getAllLinkClasses();
    yield put({ type: DELETE_LINKCLASSES_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_LINKCLASSES_FAILURE, response: {}, });
  }
};

export function* linkClassesWatcher() {
  yield takeLatest(CREATE_LINKCLASSES, createLinkClasses)
  yield takeLatest(GET_LINKCLASSES, getAllLinkClasses)
  yield takeLatest(UPDATE_LINKCLASSES, updateLinkClasses)
  yield takeLatest(DELETE_LINKCLASSES, removeLinkClasses)
  yield takeLatest(GET_LINKCLASSES_BY_ID, getLinkClassesById)
}
