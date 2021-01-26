import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_MAINACTIVITY,
  DELETE_MAINACTIVITY,
  GET_MAINACTIVITIES,
  GET_MAINACTIVITIES_FAILURE,
  UPDATE_MAINACTIVITY,
  GET_MAINACTIVITIES_SUCCESS,
  CREATE_MAINACTIVITY_FAILURE,
  CREATE_MAINACTIVITY_SUCCESS,
  UPDATE_MAINACTIVITY_FAILURE,
  UPDATE_MAINACTIVITY_SUCCESS,
  DELETE_MAINACTIVITY_SUCCESS,
  DELETE_MAINACTIVITY_FAILURE,
  GET_MAINACTIVITY_BY_ID,
  GET_MAINACTIVITY_BY_ID_SUCCESS,
  GET_MAINACTIVITY_BY_ID_FAILURE,
} from "../../../constants";

function* getAllMainActivities () {
  const response = yield http.get("/MainActivities");
  if (response.status === 200) {
    yield put({ type: GET_MAINACTIVITIES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista de actividades' });
    yield put({ type: GET_MAINACTIVITIES_FAILURE, response: {}, });
  }
};

function* createMainActivity (formValues) {
  const { activity } = formValues.payload;
  const response = yield http.post("/MainActivities",{
    activity: activity,
  });
  
  if (response.status === 201) {
    yield getAllMainActivities();
    yield put({ type: CREATE_MAINACTIVITY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó la actividad correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación de la actividad' });
    yield put({ type: CREATE_MAINACTIVITY_FAILURE, response: {}, });
  }
};

function* getMainActivityById (formValues) {
  const { mainActivityID } = formValues.payload;
  const response = yield http.get(`/MainActivities/${mainActivityID}`);
  
  if (response.status === 200) {
    yield getAllMainActivities();
    yield put({ type: GET_MAINACTIVITY_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Actividad obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la actividad' });
    yield put({ type: GET_MAINACTIVITY_BY_ID_FAILURE, response: {}, });
  }
};

function* updateMainActivity (formValues) {
  const { mainActivityID, activity } = formValues.payload;
  const response = yield http.put(`/MainActivities/${mainActivityID}`,{
    mainActivityID: Number.parseInt(mainActivityID),
    activity: activity,
  });
  
  if (response.status === 200) {
    yield getAllMainActivities();
    yield put({ type: UPDATE_MAINACTIVITY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la actividad correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la actividad' });
    yield put({ type: UPDATE_MAINACTIVITY_FAILURE, response: {}, });
  }
};

function* removeMainActivity(formValues) {
  const { mainActivityID } = formValues.payload;
  const response = yield http.delete(`/MainActivities/${mainActivityID}`);
  
  if (response.status === 200) {
    yield getAllMainActivities();
    yield put({ type: DELETE_MAINACTIVITY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la actividad correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la actividad' });
    yield put({ type: DELETE_MAINACTIVITY_FAILURE, response: {}, });
  }
};

export function* mainActivitiesWatcher() {
  yield takeLatest(CREATE_MAINACTIVITY, createMainActivity)
  yield takeLatest(GET_MAINACTIVITIES, getAllMainActivities)
  yield takeLatest(UPDATE_MAINACTIVITY, updateMainActivity)
  yield takeLatest(DELETE_MAINACTIVITY, removeMainActivity)
  yield takeLatest(GET_MAINACTIVITY_BY_ID, getMainActivityById)
}
