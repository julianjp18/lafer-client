import { LOG_OUT_MOVEMENT } from '../../movements/constants';
import {
  CONFIRM_EMAIL_SUCCESS,
  LOG_IN_SUCCESS,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
} from '../../sagas/devise/constants';

export const INITIAL_STATE = {
  token: null,
  role: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOG_IN_SUCCESS:
    case CONFIRM_EMAIL_SUCCESS:
      return { ...state, ...payload };
    case VERIFY_TOKEN_SUCCESS:
      return { ...state, ...{ ...payload, verified: true } };
    case LOG_OUT_MOVEMENT:
    case VERIFY_TOKEN_FAILURE:
      return { ...INITIAL_STATE, verified: true };
    default:
      return state;
  }
};
