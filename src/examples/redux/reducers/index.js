import {
  CREATE_COUNTRY,
  CREATE_COUNTRY_FAILURE,
  CREATE_COUNTRY_SUCCESS,
  DELETE_COUNTRY,
  DELETE_COUNTRY_FAILURE,
  DELETE_COUNTRY_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_SUCCESS,
  UPDATE_COUNTRY,
  UPDATE_COUNTRY_FAILURE,
  UPDATE_COUNTRY_SUCCESS,
  GET_COUNTRY_BY_ID,
  GET_COUNTRY_BY_ID_SUCCESS,
  GET_COUNTRY_BY_ID_FAILURE,
} from "../constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
    case DELETE_COUNTRY:
    case GET_COUNTRY_BY_ID:
    case UPDATE_COUNTRY:
    case CREATE_COUNTRY:
      return { ...state, loading: true };
    case CREATE_COUNTRY_FAILURE:
    case UPDATE_COUNTRY_FAILURE:
    case DELETE_COUNTRY_FAILURE:
    case GET_COUNTRIES_FAILURE:
    case CREATE_COUNTRY_SUCCESS:
    case UPDATE_COUNTRY_SUCCESS:
    case DELETE_COUNTRY_SUCCESS:
    case GET_COUNTRY_BY_ID_FAILURE:
      return {
        ...state,
        response: action.response,
        loading: false,
      };
    case GET_COUNTRY_BY_ID_SUCCESS:
        return {
          ...state,
          get_country: action.response,
          loading: false,
        };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        get_countries_list: action.response,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
