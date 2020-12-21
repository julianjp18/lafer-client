import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { LABELS } from '../constants';
import notify from '../../../helpers/notify';

const formatter = ({ formValues }) => ({ formValues: { labels: formValues } });

const labelsNotifier = (formValues, callback) =>
  notify({
    type: LABELS,
    formValues,
    formatter,
    callback,
  });

function* labelsAction({ formValues, callback }) {
  yield call(request, {
    type: LABELS,
    method: 'get',
    endpoint: '/helpers/labels',
    params: formValues,
    callback,
  });
}

export { labelsAction, labelsNotifier };
