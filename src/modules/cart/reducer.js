import {fromJS} from 'immutable';
import * as Actions from './constants';
import {SIGN_OUT_SUCCESS} from 'src/modules/auth/constants';

export const initState = fromJS({
  payment_method: '',
  payment_method_title: '',
  set_paid: false,
  status: 'pending',
  billing: {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    company: '',
    postcode: '',
    country: '',
    email: '',
    phone: '',
  },
  shipping: {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    company: '',
    postcode: '',
    country: '',
    email: '',
    phone: '',
    note: '',
  },
  line_items: [],
  shipping_lines: [],
  coupon_lines: [],
  customer_note: '',
});

function cartReducer(state = initState, {type, payload}) {
  switch (type) {
    case Actions.ADD_TO_CART_VALIDATED:
      return state.set('line_items', payload);
    case Actions.CHANGE_QTY_CART:
      return state.update('line_items', line_items => {
        const {item, quantity} = payload;
        const index = line_items.findIndex(i => i.equals(item));
        return line_items.setIn([index, 'quantity'], quantity);
      });
    case Actions.REMOVE_CART:
      return state.update('line_items', line_items => {
        const {item} = payload;
        return line_items.filter(i => !i.equals(item));
      });
    case Actions.CHANGE_DATA:
      return state.setIn(payload.path, payload.value);

    // Clear cart
    case Actions.CLEAR_CART:
      return initState.set('billing', state.get('billing')).set('shipping', state.get('shipping'));
    case SIGN_OUT_SUCCESS:
      return initState;

    // Coupon
    case Actions.ADD_COUPON_SUCCESS:
      return state.update('coupon_lines', coupon_lines => {
        const {code} = payload;
        // validate coupon
        if (!code) {
          return coupon_lines;
        }
        const index = coupon_lines.findIndex(coupon => coupon.get('code') === code);
        // new item
        if (index === -1) {
          return coupon_lines.push(fromJS({code}));
        }
        return coupon_lines;
      });
    case Actions.REMOVE_COUPON:
      return state.update('coupon_lines', coupon_lines => {
        const {code} = payload;
        return coupon_lines.filter(coupon => coupon.get('code') !== code);
      });
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState;
    default:
      return state;
  }
}

export default cartReducer;
