// @flow
import * as Actions from './constants';

type Action = { type: string, payload?: any, error?: any };

/**
 * Action create an order
 * @returns {{type: string}}
 */
export function createOrder(): Action {
  return {
    type: Actions.CREATE_ORDER,
  };
}

/**
 * Update an order
 * @param id: order id
 * @returns {{type: string, payload: {id: *}}}
 */
export function updateOrder(id: number): Action {
  return {
    type: Actions.UPDATE_ORDER,
    payload: {
      id,
    },
  };
}

/**
 * Refund an order
 * @param id: order id
 * @param amount: price
 * @returns {{type: string, payload: {id: *, amount: *}}}
 */
export function refundOrder(id: number, amount: string): Action {
  return {
    type: Actions.REFUND_ORDER,
    payload: {
      id,
      amount,
    },
  };
}
