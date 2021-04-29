import {
  SIGN_UP,
  SIGN_IN,
  BUY_SOAT,
  SECURE_CAR,
  CLIENT_INFO,
  VEHICLE_INFO,
  BUY_SOAT_FORM,
  MAIN_INFO,
  GET_CITIES,
  CREATE_COUNTRY,
  DELETE_COUNTRY,
  GET_COUNTRIES,
  GET_COUNTRY_BY_ID,
  UPDATE_COUNTRY,
  SAVE_SECURE_SELECTED,
  EMIT_LICENSE_PLATE,
  ADDITIONAL_DATA,
  GO_HOME,
  GO_FIRST_FORM,
} from '../constants';

export const signUp = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const signIn = (payload) => ({
  type: SIGN_IN,
  payload,
});

export const buySoat = (payload) => ({
  type: BUY_SOAT,
  payload,
});

export const secureCar = (payload) => ({
  type: SECURE_CAR,
  payload,
});

export const saveSecureSelected = (payload) => ({
  type: SAVE_SECURE_SELECTED,
  payload,
});

export const saveEmitLicensePlate = (payload) => ({
  type: EMIT_LICENSE_PLATE,
  payload,
});

export const clientInfo = (payload) => ({
  type: CLIENT_INFO,
  payload,
});

export const goHome = (payload) => ({
  type: GO_HOME,
  payload,
});

export const goFirstForm = (payload) => ({
  type: GO_FIRST_FORM,
  payload,
});

export const additionalData = (payload) => ({
  type: ADDITIONAL_DATA,
  payload,
});

export const vehicleInfo = (payload) => ({
  type: VEHICLE_INFO,
  payload,
});

export const getCities = () => ({
  type: GET_CITIES,
});

export const buySoatForm = (payload) => ({
  type: BUY_SOAT_FORM,
  payload,
});

export const mainInfo = (payload) => ({
  type: MAIN_INFO,
  payload,
});

export const getCountries = () => ({ type: GET_COUNTRIES });

export const deleteCountry = (payload) => ({
  type: DELETE_COUNTRY,
  payload,
});

export const updateCountry = (payload) => ({
  type: UPDATE_COUNTRY,
  payload,
});

export const createCountry = (payload) => ({
  type: CREATE_COUNTRY,
  payload,
});

export const getCountryById = (payload) => ({
  type: GET_COUNTRY_BY_ID,
  payload,
});
