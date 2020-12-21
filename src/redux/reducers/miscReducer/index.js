import {
  LOG_OUT_MOVEMENT,
  ADD_CART_ITEM,
  RM_CART_ITEM,
} from '../../movements/constants';
import { SHOW_BRAND_SUCCESS } from '../../sagas/brands/constants';
import { SHOW_BRIEF_SUCCESS } from '../../sagas/briefs/constants';
import { LABELS_SUCCESS } from '../../sagas/helpers/constants';
import {
  INDEX_ADVISOR_USERS_SUCCESS,
  SHOW_USER_SUCCESS,
} from '../../sagas/users/constants';

export const INITIAL_STATE = {
  labels: {
    countries: [],
    advisors: [],
    industries: [],
    roleLabels: [],
    socialNetworks: [],
    ages: [],
    categories: [],
    campaignToggles: [],
    followerRanges: [],
  },
  cart: [],
};

const addCartItem = (item, cart) => {
  const newCart = [...cart];
  newCart.push(item);
  return newCart;
};

const rmCartItem = (id, cart) => {
  const newCart = [...cart];
  const index = newCart.findIndex(({ sna }) => sna.sna === id);
  if (index) {
    newCart.splice(index, 1);
  }
  return newCart;
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_BRAND_SUCCESS:
      return { ...state, brand: { ...payload } };
    case SHOW_USER_SUCCESS:
      return { ...state, user: { ...payload } };
    case LABELS_SUCCESS:
      return { ...state, labels: { ...state.labels, ...payload } };
    case SHOW_BRIEF_SUCCESS:
      return { ...state, brief: { ...payload } };
    case INDEX_ADVISOR_USERS_SUCCESS:
      return { ...state, labels: { ...state.labels, advisors: payload.docs } };
    case ADD_CART_ITEM:
      return { ...state, cart: addCartItem(payload, state.cart) };
    case RM_CART_ITEM:
      return { ...state, cart: rmCartItem(payload, state.cart) };
    case LOG_OUT_MOVEMENT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
