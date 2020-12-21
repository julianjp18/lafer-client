import { put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { COLLAPSE_SIDER_MOVEMENT } from '../movements/constants';
import {
  hideLoaderMovement,
  showLoaderMovement,
} from '../movements/loaderMovements';
import { hideModalMovement } from '../movements/modalMovements';
import {
  hideSpinnerMovement,
  showSpinnerMovement,
} from '../movements/spinnerMovements';
import { RESTORE_PASSWORD_SUCCESS, SIGN_UP_SUCCESS } from './devise/constants';
import { UPDATE_PARAMETER_SUCCESS } from './parameters/constants';
import { CHANGE_PASSWORD_SUCCESS } from './users/constants';

const isLoaderNotifier = ({ notifier, loader }) => notifier && loader;
const isSpinnerNotifier = ({ notifier, spinner }) => notifier && spinner;

// Actions wich will close modals
const hideModalActions = [
  UPDATE_PARAMETER_SUCCESS,
  RESTORE_PASSWORD_SUCCESS,
  SIGN_UP_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
];

function* loaderListener({ type: actionName }) {
  yield put(showLoaderMovement());
  yield take(({ type, action }) => action && type.includes(actionName));
  yield put(hideLoaderMovement());
}

function* spinnerListener({ type: actionName }) {
  yield put(showSpinnerMovement());
  yield take(({ type, action }) => action && type.includes(actionName));
  yield put(hideSpinnerMovement());
}

function* locationChange({
  payload: {
    location: { pathname },
  },
}) {
  /*
  if (
    [
      CAMPAIGNS_PATH,
      ADMIN_BRANDS,
      ADMIN_PARAMETERS,
      ADMIN_SNAS,
      ADMIN_USERS,
      CAMPAIGN_PROPOSAL_PATH('/'),
    ].includes(pathname)
  )
    yield put({ type: COLLAPSE_SIDER_MOVEMENT });
    */
}

function* modalListener() {
  yield put(hideModalMovement());
}

export default [
  takeLatest(isLoaderNotifier, loaderListener),
  takeLatest(isSpinnerNotifier, spinnerListener),
  takeEvery(hideModalActions, modalListener),
  takeEvery('@@router/LOCATION_CHANGE', locationChange),
];
