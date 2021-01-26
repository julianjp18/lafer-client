import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_TYPEACTIVITY,
  DELETE_TYPEACTIVITY,
  GET_TYPEACTIVITIES,
  GET_TYPEACTIVITIES_FAILURE,
  UPDATE_TYPEACTIVITY,
  GET_TYPEACTIVITIES_SUCCESS,
  CREATE_TYPEACTIVITY_FAILURE,
  CREATE_TYPEACTIVITY_SUCCESS,
  UPDATE_TYPEACTIVITY_FAILURE,
  UPDATE_TYPEACTIVITY_SUCCESS,
  DELETE_TYPEACTIVITY_SUCCESS,
  DELETE_TYPEACTIVITY_FAILURE,
  GET_TYPEACTIVITY_BY_ID,
  GET_TYPEACTIVITY_BY_ID_SUCCESS,
  GET_TYPEACTIVITY_BY_ID_FAILURE,
} from "../../../constants";

function* getAllTypeActivities () {
  const response = yield http.get("/TypeActivities");
  if (response.status === 200) {
    yield put({ type: GET_TYPEACTIVITIES_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_TYPEACTIVITIES_FAILURE, response: {}, });
  }
};

function* createTypeActivity (formValues) {
  const { activity } = formValues.payload;
  const response = yield http.post("/TypeActivities",{
    activity: activity,
  });
  
  if (response.status === 201) {
    yield getAllTypeActivities();
    yield put({ type: CREATE_TYPEACTIVITY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_TYPEACTIVITY_FAILURE, response: {}, });
  }
};

function* getTypeActivityById (formValues) {
  const { typeActivityID } = formValues.payload;
  const response = yield http.get(`/TypeActivities/${typeActivityID}`);
  
  if (response.status === 200) {
    yield getAllTypeActivities();
    yield put({ type: GET_TYPEACTIVITY_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_TYPEACTIVITY_BY_ID_FAILURE, response: {}, });
  }
};

function* updateTypeActivity (formValues) {
  const { typeActivityID, activity } = formValues.payload;
  const response = yield http.put(`/TypeActivities/${typeActivityID}`,{
    typeActivityID: Number.parseInt(typeActivityID),
    activity: activity,
  });
  
  if (response.status === 200) {
    yield getAllTypeActivities();
    yield put({ type: UPDATE_TYPEACTIVITY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_TYPEACTIVITY_FAILURE, response: {}, });
  }
};

function* removeTypeActivity(formValues) {
  const { typeActivityID } = formValues.payload;
  const response = yield http.delete(`/TypeActivities/${typeActivityID}`);
  
  if (response.status === 200) {
    yield getAllTypeActivities();
    yield put({ type: DELETE_TYPEACTIVITY_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_TYPEACTIVITY_FAILURE, response: {}, });
  }
};

export function* typeActivitiesWatcher() {
  yield takeLatest(CREATE_TYPEACTIVITY, createTypeActivity)
  yield takeLatest(GET_TYPEACTIVITIES, getAllTypeActivities)
  yield takeLatest(UPDATE_TYPEACTIVITY, updateTypeActivity)
  yield takeLatest(DELETE_TYPEACTIVITY, removeTypeActivity)
  yield takeLatest(GET_TYPEACTIVITY_BY_ID, getTypeActivityById)
}
