import { SHOW_MODAL_MOVEMENT, HIDE_MODAL_MOVEMENT } from './constants';

export const showModalMovement = (
  modalContent,
  modalProps,
  modalConfigurations = {}
) => ({
  type: SHOW_MODAL_MOVEMENT,
  payload: { modalContent, modalProps, modalConfigurations },
});

export const hideModalMovement = () => ({ type: HIDE_MODAL_MOVEMENT });
