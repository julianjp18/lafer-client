import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
} from '../../sagas/auth/constants';

export const INITIAL_STATE = {
  token: null,
  role: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return { ...state, ...payload };
    case VERIFY_TOKEN_SUCCESS:
      return { ...state, ...{ ...payload, verified: true } };
    case VERIFY_TOKEN_FAILURE:
      return { ...INITIAL_STATE, verified: true };
    default:
      return state;
  }
};
