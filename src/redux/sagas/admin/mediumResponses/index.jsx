import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  GET_MEDIUMRESPONSES_SUCCESS,
  GET_MEDIUMRESPONSES_FAILURE,
  CREATE_MEDIUMRESPONSES_SUCCESS,
  CREATE_MEDIUMRESPONSES_FAILURE,
  GET_MEDIUMRESPONSES_BY_ID_SUCCESS,
  GET_MEDIUMRESPONSES_BY_ID_FAILURE,
  UPDATE_MEDIUMRESPONSES_SUCCESS,
  UPDATE_MEDIUMRESPONSES_FAILURE,
  DELETE_MEDIUMRESPONSES_SUCCESS,
  DELETE_MEDIUMRESPONSES_FAILURE,
  CREATE_MEDIUMRESPONSES,
  GET_MEDIUMRESPONSES,
  UPDATE_MEDIUMRESPONSES,
  DELETE_MEDIUMRESPONSES,
  GET_MEDIUMRESPONSES_BY_ID,
} from "../../../constants";

function* getAllMediumResponses () {
  const respon = yield http.get("/MediumResponses");

  if (respon.status === 200) {
    yield put({ type: GET_MEDIUMRESPONSES_SUCCESS, respon: respon.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista de respuestas' });
    yield put({ type: GET_MEDIUMRESPONSES_FAILURE, respon: {}, });
  }
};

function* createMediumResponses (formValues) {
  const { response } = formValues.payload;
  const respon = yield http.post("/MediumResponses",{
    response: response,
  });
  
  if (respon.status === 201) {
    yield getAllMediumResponses();
    yield put({ type: CREATE_MEDIUMRESPONSES_SUCCESS, respon: respon.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó la respuesta correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación de la respuesta' });
    yield put({ type: CREATE_MEDIUMRESPONSES_FAILURE, respon: {}, });
  }
};

function* getMediumResponsesById (formValues) {
  const { mediumResponseID } = formValues.payload;
  const respon = yield http.get(`/MediumResponses/${mediumResponseID}`);
  
  if (respon.status === 200) {
    yield getAllMediumResponses();
    yield put({ type: GET_MEDIUMRESPONSES_BY_ID_SUCCESS, respon: respon.data, });
    yield call(showNotification, { type: 'success', message: 'Respuesta obtenido' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la respuesta' });
    yield put({ type: GET_MEDIUMRESPONSES_BY_ID_FAILURE, respon: {}, });
  }
};

function* updateMediumResponses (formValues) {
  const { mediumResponseID, response } = formValues.payload;
  const respon = yield http.put(`/MediumResponses/${mediumResponseID}`,{
    mediumResponseID: Number.parseInt(mediumResponseID),
    response: response,
  });
  
  if (respon.status === 200) {
    yield getAllMediumResponses();
    yield put({ type: UPDATE_MEDIUMRESPONSES_SUCCESS, respon: respon.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la respuesta correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la respuesta.' });
    yield put({ type: UPDATE_MEDIUMRESPONSES_FAILURE, respon: {}, });
  }
};

function* removeMediumResponses(formValues) {
  const { mediumResponseID } = formValues.payload;
  const respon = yield http.delete(`/MediumResponses/${mediumResponseID}`);
  
  if (respon.status === 200) {
    yield getAllMediumResponses();
    yield put({ type: DELETE_MEDIUMRESPONSES_SUCCESS, respon: respon.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la respuesta correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la respuesta.' });
    yield put({ type: DELETE_MEDIUMRESPONSES_FAILURE, respon: {}, });
  }
};

export function* mediumResponsesWatcher() {
  yield takeLatest(CREATE_MEDIUMRESPONSES, createMediumResponses)
  yield takeLatest(GET_MEDIUMRESPONSES, getAllMediumResponses)
  yield takeLatest(UPDATE_MEDIUMRESPONSES, updateMediumResponses)
  yield takeLatest(DELETE_MEDIUMRESPONSES, removeMediumResponses)
  yield takeLatest(GET_MEDIUMRESPONSES_BY_ID, getMediumResponsesById)
}
