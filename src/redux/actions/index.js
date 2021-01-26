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
  CREATE_MAINACTIVITY,
  DELETE_MAINACTIVITY,
  GET_MAINACTIVITIES,
  GET_MAINACTIVITY_BY_ID,
  UPDATE_MAINACTIVITY,
  CREATE_MEDIUMRESPONSES,
  DELETE_MEDIUMRESPONSES,
  GET_MEDIUMRESPONSES,
  GET_MEDIUMRESPONSES_BY_ID,
  UPDATE_MEDIUMRESPONSES,
  CREATE_LINKCLASSES,
  DELETE_LINKCLASSES,
  GET_LINKCLASSES,
  GET_LINKCLASSES_BY_ID,
  UPDATE_LINKCLASSES,
  CREATE_PQRCONTACTS,
  DELETE_PQRCONTACTS,
  GET_PQRCONTACTS,
  GET_PQRCONTACTS_BY_ID,
  UPDATE_PQRCONTACTS,
  CREATE_TYPEACTIVITY,
  DELETE_TYPEACTIVITY,
  GET_TYPEACTIVITIES,
  GET_TYPEACTIVITY_BY_ID,
  UPDATE_TYPEACTIVITY,
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

export const clientInfo = (payload) => ({
    type: CLIENT_INFO,
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

/**
 * MAINACTIVITIES
 */
export const getMainActivities = () => ({ type: GET_MAINACTIVITIES });

export const deleteMainActivity = (payload) => ({
  type: DELETE_MAINACTIVITY,
  payload,
});

export const updateMainActivity = (payload) => ({
  type: UPDATE_MAINACTIVITY,
  payload,
});

export const createMainActivity = (payload) => ({
  type: CREATE_MAINACTIVITY,
  payload,
});

export const getMainActivityById = (payload) => ({
  type: GET_MAINACTIVITY_BY_ID,
  payload,
});

/**
 * MEDIUMRESPONSES
 */
export const getMediumResponses = () => ({ type: GET_MEDIUMRESPONSES });

export const deleteMediumResponses = (payload) => ({
  type: DELETE_MEDIUMRESPONSES,
  payload,
});

export const updateMediumResponses = (payload) => ({
  type: UPDATE_MEDIUMRESPONSES,
  payload,
});

export const createMediumResponses = (payload) => ({
  type: CREATE_MEDIUMRESPONSES,
  payload,
});

export const getMediumResponsesById = (payload) => ({
  type: GET_MEDIUMRESPONSES_BY_ID,
  payload,
});

/**
 * LINKCLASSES
 */
export const getLinkClasses = () => ({ type: GET_LINKCLASSES });

export const deleteLinkClasses = (payload) => ({
  type: DELETE_LINKCLASSES,
  payload,
});

export const updateLinkClasses = (payload) => ({
  type: UPDATE_LINKCLASSES,
  payload,
});

export const createLinkClasses = (payload) => ({
  type: CREATE_LINKCLASSES,
  payload,
});

export const getLinkClassesById = (payload) => ({
  type: GET_LINKCLASSES_BY_ID,
  payload,
});

/**
 * PQRCONTACTS
 */
export const getPQRContacts = () => ({ type: GET_PQRCONTACTS });

export const deletePQRContacts = (payload) => ({
  type: DELETE_PQRCONTACTS,
  payload,
});

export const updatePQRContacts = (payload) => ({
  type: UPDATE_PQRCONTACTS,
  payload,
});

export const createPQRContacts = (payload) => ({
  type: CREATE_PQRCONTACTS,
  payload,
});

export const getPQRContactsById = (payload) => ({
  type: GET_PQRCONTACTS_BY_ID,
  payload,
});

/**
 * TYPEACTIVITIES
 */
export const getTypeActivities = () => ({ type: GET_TYPEACTIVITIES });

export const deleteTypeActivity = (payload) => ({
  type: DELETE_TYPEACTIVITY,
  payload,
});

export const updateTypeActivity = (payload) => ({
  type: UPDATE_TYPEACTIVITY,
  payload,
});

export const createTypeActivity = (payload) => ({
  type: CREATE_TYPEACTIVITY,
  payload,
});

export const getTypeActivityById = (payload) => ({
  type: GET_TYPEACTIVITY_BY_ID,
  payload,
});
