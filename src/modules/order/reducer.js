import { fromJS } from 'immutable';
import * as Actions from './constants';
import { CLEAR_CART } from 'src/modules/cart/constants';

export const initState = fromJS({
  order: {},
  pending: false,
  data: [],
  loading: false,
  updateOrderPending: false,
  loadingRefund: false
});

function orderReducer(state = initState, { type, payload }) {
  switch (type) {
    // Create Order
    case Actions.CREATE_ORDER:
      return state.set('pending', true);
    case Actions.CREATE_ORDER_SUCCESS:
      return state.set('order', fromJS(payload)).set('pending', false);
    case Actions.CREATE_ORDER_ERROR:
      return state.set('pending', false);

    // Update Order
    case Actions.UPDATE_ORDER:
      return state
        .set('updateOrderPending', true)
        .set('order', initState.get('order'));
    case Actions.UPDATE_ORDER_SUCCESS:
    case Actions.UPDATE_ORDER_ERROR:
      return state.set('updateOrderPending', false);

    // Refund Order
    case Actions.REFUND_ORDER:
      return state.set('loadingRefund', true);
    case Actions.REFUND_ORDER_SUCCESS:
    case Actions.REFUND_ORDER_ERROR:
      return state.set('loadingRefund', false);

    case CLEAR_CART:
      return state.set('order', initState.get('order'));

    default:
      return state;
  }
}

export default orderReducer;
