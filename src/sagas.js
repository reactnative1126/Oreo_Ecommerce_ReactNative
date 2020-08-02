import { all } from 'redux-saga/effects';

import authSaga from './modules/auth/saga';
import categorySaga from './modules/category/saga';
import cartSaga from './modules/cart/saga';
import productSaga from './modules/product/saga';
import commonSaga from './modules/common/saga';
import orderSaga from './modules/order/saga';
import vendorSaga from './modules/vendor/saga';

/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */
export default function* rootSagas() {
  yield all([commonSaga(), authSaga(), cartSaga(), categorySaga(), productSaga(), orderSaga(), vendorSaga()]);
}
