import currencyFormatter from 'currency-formatter';

export default (value, currency, options = {}) => {
  if (value) {
    return currencyFormatter.format(value, {
      code: currency,
    });
  }
  return 0;
};
