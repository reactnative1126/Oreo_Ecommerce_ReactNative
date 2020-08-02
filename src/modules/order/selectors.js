import { createSelector } from 'reselect';

const rootOrder = state => state.order;

/**
 * Select order
 */
export const selectOrder = createSelector(
  rootOrder,
  order => order.get('order')
);

/**
 * Select order pending
 */
export const selectOrderPending = createSelector(
  rootOrder,
  order => order.get('pending')
);

/**
 * Select order data
 */
export const selectOrderData = createSelector(
  rootOrder,
  order => order.get('data')
);

/**
 * Select order loading
 */
export const selectOrderDataLoading = createSelector(
  rootOrder,
  order => order.get('loading')
);

/**
 * Select update order pending
 */
export const selectUpdateOrderPending = createSelector(
  rootOrder,
  order => order.get('updateOrderPending')
);

/**
 * Select update order pending
 */
export const refundOrderLoading = createSelector(
  rootOrder,
  order => order.get('loadingRefund')
);
