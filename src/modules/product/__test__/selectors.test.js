import { fromJS } from 'immutable';
import currencyFormatter from 'currency-formatter';
import {
  loadingNewProductSelector,
  newProductsSelector,
  loadingSaleProductSelector,
  saleProductsSelector,
} from '../selectors';

import {
  productSimple,
  productSimple2,
  productVariation,
  productGrouped,
  productExternal,
} from 'src/mock/products';

const currency = 'USD';
const defaultCurrency = 'USD';

const setting = {
  currency: currency,
  defaultCurrency: defaultCurrency,
};

const products = [
  { ...productSimple },
  { ...productSimple2 },
  { ...productVariation },
  { ...productGrouped },
  { ...productExternal },
];

describe('Selectors new products', () => {
  it('should handle loading new products', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // loading new product state
    const loading = loadingNewProductSelector(state);
    expect(loading).toBeFalsy();
  });

  it('should handle select new products variation: simple', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 100
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('regular_price'), {
        code: currency,
      }),
      sale_price: currencyFormatter.format(product.get('sale_price'), {
        code: currency,
      }),
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: simple without sale', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple without sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 101
    );
    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('regular_price'), {
        code: currency,
      }),
      sale_price: '',
    };
    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: variable', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple without sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 200
    );
    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('price'), {
        code: currency,
      }),
      sale_price: '',
    };
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: grouped', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple without sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 300
    );
    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('price'), {
        code: currency,
      }),
      sale_price: '',
    };
    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: simple with change currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 100
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn([
          'multi-currency-prices',
          changedCurrency,
          'regular_price',
        ]),
        {
          code: changedCurrency,
        }
      ),
      sale_price: currencyFormatter.format(
        product.getIn(['multi-currency-prices', changedCurrency, 'sale_price']),
        {
          code: changedCurrency,
        }
      ),
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: simple without sale with changed currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 101
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn([
          'multi-currency-prices',
          changedCurrency,
          'regular_price',
        ]),
        {
          code: changedCurrency,
        }
      ),
      sale_price: '',
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: variable with changed currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 200
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn(['from-multi-currency-prices', changedCurrency, 'price']),
        {
          code: changedCurrency,
        }
      ),
      sale_price: '',
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select new products variation: grouped with changed currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        new: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = newProductsSelector(state).find(
      item => item.get('id') === 300
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn(['from-multi-currency-prices', changedCurrency, 'price']),
        {
          code: changedCurrency,
        }
      ),
      sale_price: '',
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });
});

describe('Selectors sale products', () => {
  it('should handle loading sale products', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // loading new product state
    const loading = loadingSaleProductSelector(state);
    expect(loading).toBeFalsy();
  });

  it('should handle select sale products variation: simple', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 100
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('regular_price'), {
        code: currency,
      }),
      sale_price: currencyFormatter.format(product.get('sale_price'), {
        code: currency,
      }),
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: simple without sale', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple without sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 101
    );
    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('regular_price'), {
        code: currency,
      }),
      sale_price: '',
    };
    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: variable', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple without sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 200
    );
    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('price'), {
        code: currency,
      }),
      sale_price: '',
    };
    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: grouped', () => {
    const state = {
      setting: fromJS(setting),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple without sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 300
    );
    const price_format_expected = {
      regular_price: currencyFormatter.format(product.get('price'), {
        code: currency,
      }),
      sale_price: '',
    };
    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: simple with change currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 100
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn([
          'multi-currency-prices',
          changedCurrency,
          'regular_price',
        ]),
        {
          code: changedCurrency,
        }
      ),
      sale_price: currencyFormatter.format(
        product.getIn(['multi-currency-prices', changedCurrency, 'sale_price']),
        {
          code: changedCurrency,
        }
      ),
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: simple without sale with changed currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 101
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn([
          'multi-currency-prices',
          changedCurrency,
          'regular_price',
        ]),
        {
          code: changedCurrency,
        }
      ),
      sale_price: '',
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: variable with changed currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 200
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn(['from-multi-currency-prices', changedCurrency, 'price']),
        {
          code: changedCurrency,
        }
      ),
      sale_price: '',
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });

  it('should handle select sale products variation: grouped with changed currency', () => {
    const changedCurrency = 'VND';

    const state = {
      setting: fromJS({
        ...setting,
        currency: changedCurrency,
      }),
      product: fromJS({
        loading: false,
        data: [],
        sale: {
          loading: false,
          data: products,
        },
      }),
    };

    // Product simple with sale
    const product = saleProductsSelector(state).find(
      item => item.get('id') === 300
    );

    const price_format_expected = {
      regular_price: currencyFormatter.format(
        product.getIn(['from-multi-currency-prices', changedCurrency, 'price']),
        {
          code: changedCurrency,
        }
      ),
      sale_price: '',
    };

    expect(typeof product.get('price_format').toJS()).toBe('object');
    expect(product.get('price_format').toJS()).toStrictEqual(
      price_format_expected
    );
  });
});
