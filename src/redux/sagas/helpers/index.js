import { takeLatest } from 'redux-saga/effects';
import { LABELS } from './constants';
import { labelsAction } from './actions/labels';

export default [takeLatest(LABELS, labelsAction)];
