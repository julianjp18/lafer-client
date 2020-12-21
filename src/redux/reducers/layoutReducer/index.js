import {
  LOG_OUT_MOVEMENT,
  TOGGLE_SIDER_MOVEMENT,
  HIDE_SIDER_MOVEMENT,
  SHOW_SIDER_MOVEMENT,
  COLLAPSE_SIDER_MOVEMENT,
  EXPAND_SIDER_MOVEMENT,
  HIDE_LAYOUT_MOVEMENT,
  CLEAR_SPACES_LAYOUT_MOVEMENT,
  SHOW_LAYOUT_MOVEMENT,
  RESET_SPACES_LAYOUT_MOVEMENT,
} from '../../movements/constants';

export const INITIAL_STATE = {
  sider: {
    visible: window.innerWidth > 992,
    collapsed: false,
  },
  header: {
    visible: true,
  },
  clearSpaces: false,
};

export default (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case HIDE_LAYOUT_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, visible: false },
        header: { ...state.sider, visible: false },
      };
    case SHOW_LAYOUT_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, visible: true },
        header: { ...state.sider, visible: true },
      };
    case TOGGLE_SIDER_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, collapsed: !state.sider.collapsed },
      };
    case HIDE_SIDER_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, visible: false },
      };
    case SHOW_SIDER_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, visible: true },
      };
    case COLLAPSE_SIDER_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, collapsed: true, visible: true },
      };
    case EXPAND_SIDER_MOVEMENT:
      return {
        ...state,
        sider: { ...state.sider, collapsed: false },
      };
    case CLEAR_SPACES_LAYOUT_MOVEMENT:
      return {
        ...state,
        clearSpaces: true,
      };
    case RESET_SPACES_LAYOUT_MOVEMENT:
      return {
        ...state,
        clearSpaces: false,
      };
    case LOG_OUT_MOVEMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
