const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CLIENT_INFO':
    case 'VEHICLE_INFO':
    case 'BUY_SOAT':
    case 'SIGN_IN':
    case 'SIGN_UP':
    case 'BUY_SOAT_FORM':
    case 'MAIN_INFO':
      return { ...state, response: {}, loading: true };
    case 'SIGN_UP_FAILURE':
    case 'SIGN_IN_FAILURE':
    case 'CLIENT_INFO_FAILURE':
    case 'VEHICLE_INFO_FAILURE':
    case 'BUY_SOAT_FAILURE':
    case 'BUY_SOAT_FORM_FAILURE':
    case 'MAIN_INFO_FAILURE':
    case 'SIGN_IN_SUCCESS':
    case 'SIGN_UP_SUCCESS':
    case 'MAIN_INFO_SUCCESS':
      return { ...state, response: action.response, loading: false }
    case 'CLIENT_INFO_SUCCESS':
      return {
        ...state,
        response: {},
        client_info_soat: action.client_info
      };
    case 'VEHICLE_INFO_SUCCESS':
      return {
        ...state,
        response: {},
        vehicle_info_soat: action.vehicle_info
      };
    case 'BUY_SOAT_SUCCESS':
      return {
        ...state,
        response: {},
        buy_soat: action.buy_soat
      };
    case 'BUY_SOAT_FORM_SUCCESS':
    default:
      return state;
  }
};

export default reducer;