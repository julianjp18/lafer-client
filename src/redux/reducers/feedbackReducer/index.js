import {
  HIDE_LOADER_MOVEMENT,
  HIDE_MODAL_MOVEMENT,
  HIDE_SPINNER_MOVEMENT,
  LOG_OUT_MOVEMENT,
  SHOW_LOADER_MOVEMENT,
  SHOW_MODAL_MOVEMENT,
  SHOW_SPINNER_MOVEMENT,
} from '../../movements/constants';

// TODO: Content loader (Skeleton)
const LOADER_INITIAL_STATE = {
  loaderActive: false,
  spinnerActive: false,
};

const MODAL_INITIAL_STATE = {
  modalContent: null,
  modalProps: {},
  modalConfigurations: {},
};

const INITIAL_STATE = {
  ...LOADER_INITIAL_STATE,
  ...MODAL_INITIAL_STATE,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_LOADER_MOVEMENT:
      return { ...state, loaderActive: true };
    case HIDE_LOADER_MOVEMENT:
      return { ...state, loaderActive: false };
    case SHOW_SPINNER_MOVEMENT:
      return { ...state, spinnerActive: true };
    case HIDE_SPINNER_MOVEMENT:
      return { ...state, spinnerActive: false };
    case SHOW_MODAL_MOVEMENT:
      return { ...state, ...payload };
    case HIDE_MODAL_MOVEMENT:
      return { ...state, ...MODAL_INITIAL_STATE };
    case LOG_OUT_MOVEMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
