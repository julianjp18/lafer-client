import i18n from 'i18next';
import moment from 'moment';
import { isEmpty } from 'validator';
import { numFormat } from '../helpers/input/format';

const capitalize = (string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : string;

const t = (value) => i18n.t(value);

const getTranslate = (object, key) => t(`${object}.${key}`);

export {
  capitalize,
  t,
  getTranslate,
};
