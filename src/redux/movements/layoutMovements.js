import {
  COLLAPSE_SIDER_MOVEMENT,
  EXPAND_SIDER_MOVEMENT,
  HIDE_LAYOUT_MOVEMENT,
  HIDE_SIDER_MOVEMENT,
  SHOW_LAYOUT_MOVEMENT,
  SHOW_SIDER_MOVEMENT,
  TOGGLE_SIDER_MOVEMENT,
  RESET_SPACES_LAYOUT_MOVEMENT,
  CLEAR_SPACES_LAYOUT_MOVEMENT,
} from './constants';

export const toggleSiderMovement = () => ({ type: TOGGLE_SIDER_MOVEMENT });
export const hideSiderMovement = () => ({ type: HIDE_SIDER_MOVEMENT });
export const showSiderMovement = () => ({ type: SHOW_SIDER_MOVEMENT });
export const collapseSiderMovement = () => ({ type: COLLAPSE_SIDER_MOVEMENT });
export const expandSiderMovement = () => ({ type: EXPAND_SIDER_MOVEMENT });
export const hideLayoutMovement = () => ({ type: HIDE_LAYOUT_MOVEMENT });
export const showLayoutMovement = () => ({ type: SHOW_LAYOUT_MOVEMENT });
export const hideSpinnerMovement = () => ({ type: '' });
export const clearSpacesLayoutMovement = () => ({
  type: CLEAR_SPACES_LAYOUT_MOVEMENT,
});
export const resetSpacesLayoutMovement = () => ({
  type: RESET_SPACES_LAYOUT_MOVEMENT,
});
