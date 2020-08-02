import {createSelector} from 'reselect';
import {fromJS} from 'immutable';
import {shippingAddressInit} from './config';

export const auth = state => state.auth;
export const authSelector = createSelector(
  auth,
  data => data.toJS(),
);

export const isLoginSelector = createSelector(
  auth,
  data => data.get('isLogin'),
);

/**
 * Get user id
 */
export const userIdSelector = createSelector(
  auth,
  data => data.getIn(['user', 'ID']),
);

/**
 * Get data address
 */
export const shippingAddressSelector = createSelector(
  auth,
  data =>
    data.get('shippingAddress') && data.get('shippingAddress').size > 0
      ? data.get('shippingAddress')
      : fromJS(shippingAddressInit),
);

/**
 * Token selector
 * @type {OutputSelector<unknown, *, (res: *) => *>}
 */
export const tokenSelector = createSelector(
  auth,
  data => data.get('token'),
);
