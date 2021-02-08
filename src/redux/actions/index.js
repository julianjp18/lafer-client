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
  CREATE_PRODUCTS,
  DELETE_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_ID,
  UPDATE_PRODUCTS,
  CREATE_INSURERS,
  DELETE_INSURERS,
  GET_INSURERS,
  GET_INSURERS_BY_ID,
  UPDATE_INSURERS,
  CREATE_TYPEOPERATIONS,
  DELETE_TYPEOPERATIONS,
  GET_TYPEOPERATIONS,
  GET_TYPEOPERATIONS_BY_ID,
  UPDATE_TYPEOPERATIONS,
  CREATE_TYPEINDUSTRIES,
  DELETE_TYPEINDUSTRIES,
  GET_TYPEINDUSTRIES,
  GET_TYPEINDUSTRIES_BY_ID,
  UPDATE_TYPEINDUSTRIES,
  CREATE_TYPEIDENTIFICATIONS,
  DELETE_TYPEIDENTIFICATIONS,
  GET_TYPEIDENTIFICATIONS,
  GET_TYPEIDENTIFICATIONS_BY_ID,
  UPDATE_TYPEIDENTIFICATIONS,
  CREATE_TYPECOMPANIES,
  DELETE_TYPECOMPANIES,
  GET_TYPECOMPANIES,
  GET_TYPECOMPANIES_BY_ID,
  UPDATE_TYPECOMPANIES,
  CREATE_REQUESTTYPES,
  DELETE_REQUESTTYPES,
  GET_REQUESTTYPES,
  GET_REQUESTTYPES_BY_ID,
  UPDATE_REQUESTTYPES,
  IDLEADSHARP_SUCCESS,
  IDLEADSHARP,
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

/**
 * PRODUCTS
 */
export const getProducts = () => ({ type: GET_PRODUCTS });

export const deleteProducts = (payload) => ({
  type: DELETE_PRODUCTS,
  payload,
});

export const updateProducts = (payload) => ({
  type: UPDATE_PRODUCTS,
  payload,
});

export const createProducts = (payload) => ({
  type: CREATE_PRODUCTS,
  payload,
});

export const getProductsById = (payload) => ({
  type: GET_PRODUCTS_BY_ID,
  payload,
});

/**
 * INSURERS
 */
export const getInsurers = () => ({ type: GET_INSURERS });

export const deleteInsurers = (payload) => ({
  type: DELETE_INSURERS,
  payload,
});

export const updateInsurers = (payload) => ({
  type: UPDATE_INSURERS,
  payload,
});

export const createInsurers = (payload) => ({
  type: CREATE_INSURERS,
  payload,
});

export const getInsurersById = (payload) => ({
  type: GET_INSURERS_BY_ID,
  payload,
});

/**
 * TYPEOPERATIONS
 */
export const getTypeOperations = () => ({ type: GET_TYPEOPERATIONS });

export const deleteTypeOperations = (payload) => ({
  type: DELETE_TYPEOPERATIONS,
  payload,
});

export const updateTypeOperations = (payload) => ({
  type: UPDATE_TYPEOPERATIONS,
  payload,
});

export const createTypeOperations = (payload) => ({
  type: CREATE_TYPEOPERATIONS,
  payload,
});

export const getTypeOperationsById = (payload) => ({
  type: GET_TYPEOPERATIONS_BY_ID,
  payload,
});

/**
 * TYPEINDUSTRIES
 */
export const getTypeIndustries = () => ({ type: GET_TYPEINDUSTRIES });

export const deleteTypeIndustries = (payload) => ({
  type: DELETE_TYPEINDUSTRIES,
  payload,
});

export const updateTypeIndustries = (payload) => ({
  type: UPDATE_TYPEINDUSTRIES,
  payload,
});

export const createTypeIndustries = (payload) => ({
  type: CREATE_TYPEINDUSTRIES,
  payload,
});

export const getTypeIndustriesById = (payload) => ({
  type: GET_TYPEINDUSTRIES_BY_ID,
  payload,
});

/**
 * TYPEIDENTIFICATIONS
 */
export const getTypeIdentifications = () => ({ type: GET_TYPEIDENTIFICATIONS });

export const deleteTypeIdentifications = (payload) => ({
  type: DELETE_TYPEIDENTIFICATIONS,
  payload,
});

export const updateTypeIdentifications = (payload) => ({
  type: UPDATE_TYPEIDENTIFICATIONS,
  payload,
});

export const createTypeIdentifications = (payload) => ({
  type: CREATE_TYPEIDENTIFICATIONS,
  payload,
});

export const getTypeIdentificationsById = (payload) => ({
  type: GET_TYPEIDENTIFICATIONS_BY_ID,
  payload,
});

/**
 * TYPECOMPANIES
 */
export const getTypeCompanies = () => ({ type: GET_TYPECOMPANIES });

export const deleteTypeCompanies = (payload) => ({
  type: DELETE_TYPECOMPANIES,
  payload,
});

export const updateTypeCompanies = (payload) => ({
  type: UPDATE_TYPECOMPANIES,
  payload,
});

export const createTypeCompanies = (payload) => ({
  type: CREATE_TYPECOMPANIES,
  payload,
});

export const getTypeCompaniesById = (payload) => ({
  type: GET_TYPECOMPANIES_BY_ID,
  payload,
});

/**
 * REQUESTTYPES
 */
export const getRequestTypes = () => ({ type: GET_REQUESTTYPES });

export const deleteRequestTypes = (payload) => ({
  type: DELETE_REQUESTTYPES,
  payload,
});

export const updateRequestTypes = (payload) => ({
  type: UPDATE_REQUESTTYPES,
  payload,
});

export const createRequestTypes = (payload) => ({
  type: CREATE_REQUESTTYPES,
  payload,
});

export const getRequestTypesById = (payload) => ({
  type: GET_REQUESTTYPES_BY_ID,
  payload,
});

/**
 * SHARPRING
 */
export const getIdLeadSharp = (payload) => ({
  type: IDLEADSHARP,
  payload,
});
