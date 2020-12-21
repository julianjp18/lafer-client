import { takeLatest } from 'redux-saga/effects';
import {
  LOG_IN,
  VERIFY_TOKEN,
  FETCH_CAMPAIGNS,
  SIGN_UP,
  CONFIRM_EMAIL,
  RESEND_EMAIL,
  RECOVER_PASSWORD,
  RESTORE_PASSWORD,
} from './constants';
import { logInAction } from './actions/logIn';
import { verifyTokenAction } from './actions/verifyToken';
import { fetchCampaignsAction } from './actions/fetchCampaigns';
import { signUpAction } from './actions/signUp';
import { confirmEmailAction } from './actions/confirmEmail';
import { resendEmailAction } from './actions/resendEmail';
import { restorePasswordAction } from './actions/restorePassword';
import { recoverPasswordAction } from './actions/recoverPassword';

export default [
  takeLatest(LOG_IN, logInAction),
  takeLatest(SIGN_UP, signUpAction),
  takeLatest(VERIFY_TOKEN, verifyTokenAction),
  takeLatest(CONFIRM_EMAIL, confirmEmailAction),
  takeLatest(RESEND_EMAIL, resendEmailAction),
  takeLatest(RECOVER_PASSWORD, recoverPasswordAction),
  takeLatest(RESTORE_PASSWORD, restorePasswordAction),
  takeLatest(FETCH_CAMPAIGNS, fetchCampaignsAction),
];
