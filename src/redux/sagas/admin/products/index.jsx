import { put, takeLatest, call } from 'redux-saga/effects';
import http from "../../../../axios";
import showNotification from "../../../../redux/showNotification";
import {
  CREATE_PRODUCTS,
  DELETE_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_FAILURE,
  UPDATE_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAILURE,
  UPDATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  GET_PRODUCTS_BY_ID,
  GET_PRODUCTS_BY_ID_SUCCESS,
  GET_PRODUCTS_BY_ID_FAILURE,
} from "../../../constants";


function* getAllProducts() {
  const response = yield http.get("/Products");

  if (response.status === 200) {
    yield put({ type: GET_PRODUCTS_SUCCESS, response: response.data, });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la lista' });
    yield put({ type: GET_PRODUCTS_FAILURE, response: {}, });
  }
};

function* createProducts(formValues) {
  const { name, features, features2, features3, features4, features5} = formValues.payload;
  const response = yield http.post("/Products", {
    name:name,
    features:features,
    features2:features2,
    features3:features3,
    features4:features4,
    features5:features5,
  });

  if (response.status === 201) {
    yield getAllProducts();
    yield put({ type: CREATE_PRODUCTS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se creó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la creación' });
    yield put({ type: CREATE_PRODUCTS_FAILURE, response: {}, });
  }
};

function* getProductsById(formValues) {
  const { productID } = formValues.payload;
  const response = yield http.get(`/Products/${productID}`);

  if (response.status === 200) {
    yield getAllProducts();
    yield put({ type: GET_PRODUCTS_BY_ID_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Información obtenida' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error en la obtención de la información' });
    yield put({ type: GET_PRODUCTS_BY_ID_FAILURE, response: {}, });
  }
};

function* updateProducts(formValues) {
  const { productID, name, features, features2, features3, features4, features5,} = formValues.payload;
  const response = yield http.put(`/Products/${productID}`, {
    productID: Number.parseInt(productID),
    name:name,
    features:features,
    features2:features2,
    features3:features3,
    features4:features4,
    features5:features5,
  });

  if (response.status === 200) {
    yield getAllProducts();
    yield put({ type: UPDATE_PRODUCTS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se modificó correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de modificar la información' });
    yield put({ type: UPDATE_PRODUCTS_FAILURE, response: {}, });
  }
};

function* removeProducts(formValues) {
  const { productID } = formValues.payload;
  const response = yield http.delete(`/Products/${productID}`);

  if (response.status === 200) {
    yield getAllProducts();
    yield put({ type: DELETE_PRODUCTS_SUCCESS, response: response.data, });
    yield call(showNotification, { type: 'success', message: 'Se eliminó la información correctamente' });
  } else {
    yield call(showNotification, { type: 'warning', message: 'Error al tratar de eliminar la información' });
    yield put({ type: DELETE_PRODUCTS_FAILURE, response: {}, });
  }
};

export function* productsWatcher() {
  yield takeLatest(CREATE_PRODUCTS, createProducts)
  yield takeLatest(GET_PRODUCTS, getAllProducts)
  yield takeLatest(UPDATE_PRODUCTS, updateProducts)
  yield takeLatest(DELETE_PRODUCTS, removeProducts)
  yield takeLatest(GET_PRODUCTS_BY_ID, getProductsById)
}
