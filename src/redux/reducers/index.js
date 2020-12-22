
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
    case 'SIGN_UP':
      return { ...state, loading: true };
    case 'SIGN_UP_FAILURE':
    case 'SIGN_IN_FAILURE':
      return { ...state, auth: {}, loading: false }
    case 'SIGN_IN_SUCCESS':
    case 'SIGN_UP_SUCCESS':
      return { ...state, auth: action.response, loading: false }
    default:
      return state;
  }
};
export default reducer;