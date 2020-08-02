import currencyFormatter from 'currency-formatter';

import currencyFormatterUtils from '../currency-formatter';

describe('currencyFormatterUtils', () => {
  it('should handle format empty value', () => {
    const value = '';
    const currency = 'USD';
    const options = {};

    const expectedValue = '';

    expect(currencyFormatterUtils(value, currency, options)).toBe(
      expectedValue
    );
  });

  it('should handle format undefined value', () => {
    const value = undefined;
    const currency = 'USD';
    const options = {};

    const expectedValue = '';

    expect(currencyFormatterUtils(value, currency, options)).toBe(
      expectedValue
    );
  });

  it('should handle format value', () => {
    const value = 100;
    const currency = 'USD';
    const options = {};

    const expectedValue = currencyFormatter.format(value, { code: currency });

    expect(currencyFormatterUtils(value, currency, options)).toBe(
      expectedValue
    );
  });

  it('should handle format string value', () => {
    const value = '100';
    const currency = 'USD';
    const options = {};

    const expectedValue = currencyFormatter.format(100, { code: currency });

    expect(currencyFormatterUtils(value, currency, options)).toBe(
      expectedValue
    );
  });
});
