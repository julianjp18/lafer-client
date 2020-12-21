import { call } from 'redux-saga/effects';
import request from '../../../helpers/request';
import { FETCH_CAMPAIGNS } from '../constants';
import notify from '../../../helpers/notify';

const formatter = ({ formValues }) => ({
  formValues: {
    campaign: {
      ...formValues,
    },
  },
});

const fetchCampaignsNotifier = (formValues) =>
  notify({
    type: FETCH_CAMPAIGNS,
    formatter,
    formValues,
  });

function* fetchCampaignsAction({ formValues }) {
  yield call(request, {
    type: FETCH_CAMPAIGNS,
    method: 'get',
    endpoint: '/campaigns',
    params: formValues,
  });
}

export { fetchCampaignsAction, fetchCampaignsNotifier };
