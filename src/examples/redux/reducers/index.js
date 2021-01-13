import {
  CREATE_COUNTRY,
  CREATE_COUNTRY_FAILURE,
  DELETE_COUNTRY_FAILURE,
  DELETE_COUNTRY_SUCCESS,
  GET_COUNTRIES,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_SUCCESS,
  UPDATE_COUNTRY,
} from "../constants";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
    case DELETE_COUNTRY:
    case UPDATE_COUNTRY:
    case CREATE_COUNTRY:
      return { ...state, loading: true };
    case CREATE_COUNTRY_FAILURE:
    case UPDATE_COUNTRY_FAILURE:
    case DELETE_COUNTRY_FAILURE:
    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        response: action.response,
        loading: false,
      };
    case CREATE_COUNTRY_SUCCESS:
      return {
        ...state,
        response: action.response,
        loading: false,
      };
    case UPDATE_COUNTRY_SUCCESS:
    case DELETE_COUNTRY_SUCCESS:
    case MAIN_INFO_SUCCESS:
      return {
        ...state,
        response: action.response,
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
