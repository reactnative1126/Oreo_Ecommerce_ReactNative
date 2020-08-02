import { fromJS } from 'immutable';
import * as Actions from './constants';

type Action = { type: string, payload: Object };

// type CartItem = {
//   product_id: number,
//   quantity: number,
//   variation_id: number,
//   name: string,
//   price: number,
// };

/**
 * Action Add to cart
 * @param item
 * @param item
 * @returns {{type: string, payload: {item: CartItem, cb: *}}}
 */
export function addToCart(item, cb = () => {}): Action {
  return {
    type: Actions.ADD_TO_CART,
    payload: {item, cb},
  };
}
/**
 * Action Add to list cart
 * @param list
 * @returns {{type: string, payload: {list: Array<CartItem>}}}
 */
export function addListToCart(list): Action {
  return {
    type: Actions.ADD_TO_CART_LIST,
    payload: list,
  };
}

/**
 * Action change quantity
 * @param item
 * @param quantity
 * @returns {{type: string, payload: {item: *, quantity: *}}}
 */
export function changeQuantity(item, quantity) {
  return {
    type: Actions.CHANGE_QTY_CART,
    payload: {
      item: fromJS(item),
      quantity,
    },
  };
}

/**
 * Action remove one item cart
 * @param item
 * @returns {{type: string, payload: {item: *}}}
 */
export function removeCart(item) {
  return {
    type: Actions.REMOVE_CART,
    payload: {
      item: fromJS(item),
    },
  };
}

/**
 * Action clear all item in cart
 * @returns {{type}}
 */
export function clearCart() {
  return {
    type: Actions.CLEAR_CART,
  };
}

/**
 * Add coupon code
 * @param code
 * @returns {{type, payload: {code: *}}}
 */
export function addCoupon(code) {
  return {
    type: Actions.ADD_COUPON,
    payload: {
      code,
    },
  };
}

/**
 * Action remove coupon
 * @returns {{type}}
 */
export function removeCoupon(code) {
  return {
    type: Actions.REMOVE_COUPON,
    payload: {
      code,
    },
  };
}

/**
 * Change data in path
 * @param path: collection, Iterable
 * @param value: any
 * @returns {{type: string, payload: {path: *, value: *}}}
 */
export function changeData(path, value) {
  return {
    type: Actions.CHANGE_DATA,
    payload: {
      path,
      value,
    },
  };
}
