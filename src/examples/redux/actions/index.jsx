import {
  CREATE_COUNTRY,
  DELETE_COUNTRY,
  GET_COUNTRIES,
  GET_COUNTRY_BY_ID,
  UPDATE_COUNTRY,
} from "../constants";

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
