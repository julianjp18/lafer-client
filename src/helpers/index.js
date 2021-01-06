const numOnly = (value) => value && `${value}`.replace(/[^0-9.]/g, '');
const numFormat = (value) =>
  value ? numOnly(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : 0;
const currencyFormat = (value, iso, fixed = 0) =>
  `$${numFormat(parseFloat(value).toFixed(value > 0 ? fixed : 0))} ${
    iso || ''
  }`;

export {
  currencyFormat
};
