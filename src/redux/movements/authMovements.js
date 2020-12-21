import { LOG_OUT_MOVEMENT } from './constants';

const logOutMovement = (manual = true) => ({ type: LOG_OUT_MOVEMENT, manual });

export default logOutMovement;
