import { createSelector } from 'reselect';
import { defaultCurrencySelector, currencySelector } from '../common/selectors';

export const rootCart = state => state.cart;

/**
 * Select cart list
 */
export const selectCartList = createSelector(
  rootCart,
  cart => cart.get('line_items')
);

/**
 * Count item in cart
 */
export const cartSizeSelector = createSelector(
  selectCartList,
  list => list.reduce((total, item) => item.get('quantity') + total, 0),
);

/**
 * cart total
 */
export const cartTotalSelector = createSelector(
  selectCartList,
  defaultCurrencySelector,
  currencySelector,
  (items, defaultCurrency, currency) => {
    return items.reduce((total, item) => {
      const product = item.get('product');
      const variation = item.get('variation');
      const quantity = item.get('quantity');

      const source = product.get('type') === 'variable' ? variation : product;
      const regular_price =
        currency === defaultCurrency
          ? source.get('regular_price')
          : source.getIn(['multi-currency-prices', currency, 'regular_price']);
      const sale_price =
        currency === defaultCurrency
          ? source.get('sale_price')
          : source.getIn(['multi-currency-prices', currency, 'sale_price']);
      const price = sale_price ? sale_price : regular_price;
      return total + price * quantity;
    }, 0);
  }
);

/**
 * Select shipping address
 */
export const selectShippingAddress = createSelector(
  rootCart,
  cart => cart.get('shipping')
);

/**
 * Selected shipping method
 */
export const selectedShippingMethod = createSelector(
  rootCart,
  cart => cart.getIn(['shipping_lines', 0])
);

/**
 * Select billing address
 */
export const selectBillingAddress = createSelector(
  rootCart,
  cart => cart.get('billing')
);

/**
 * Selected payment method
 */
export const selectedPaymentMethod = createSelector(
  rootCart,
  cart => cart.get('payment_method')
);

/**
 * Selected coupon list
 */
export const couponLinesSelector = createSelector(
  rootCart,
  cart => cart.get('coupon_lines')
);

/**
 * Selected note customer
 */
export const noteCustomerSelector = createSelector(
  rootCart,
  cart => cart.get('customer_note')
);
