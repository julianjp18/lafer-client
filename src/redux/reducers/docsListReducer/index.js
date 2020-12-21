import { LOG_OUT_MOVEMENT } from '../../movements/constants';
import { INDEX_BRANDS_SUCCESS } from '../../sagas/brands/constants';
import { INDEX_BRIEFS_SUCCESS } from '../../sagas/briefs/constants';
import { GET_PARAMETERS_SUCCESS } from '../../sagas/parameters/constants';
import { INDEX_SNA_SUCCESS } from '../../sagas/socialNetworkAccounts/constants';
import { INDEX_SNT_SUCCESS } from '../../sagas/socialNetworkTraces/constants';
import {
  INDEX_BRAND_USERS_SUCCESS,
  INDEX_USERS_SUCCESS,
} from '../../sagas/users/constants';
import { INDEX_CAMPAIGNS_SUCCESS } from '../../sagas/campaigns/constants';

export const INITIAL_STATE = {
  kind: null,
  docs: null,
  totalDocs: 0,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case INDEX_USERS_SUCCESS:
    case GET_PARAMETERS_SUCCESS:
    case INDEX_BRANDS_SUCCESS:
    case INDEX_SNA_SUCCESS:
    case INDEX_BRAND_USERS_SUCCESS:
    case INDEX_SNT_SUCCESS:
    case INDEX_BRIEFS_SUCCESS:
    case INDEX_CAMPAIGNS_SUCCESS:
      return { ...state, ...payload };
    case LOG_OUT_MOVEMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
