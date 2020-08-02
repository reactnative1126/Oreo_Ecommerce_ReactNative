import { put, call, takeEvery } from 'redux-saga/effects';

import * as Actions from './constants';

import { fetchCountries, fetchPaymentGateways } from './service';
import { fetchShippingZoneMethod } from '../cart/service';

/**
 * Fetch countries saga
 * @returns {IterableIterator<*>}
 */
function* fetchCountrySaga() {
  try {
    const countries = yield call(fetchCountries);
    yield put({
      type: Actions.FETCH_COUNTRY_SUCCESS,
      payload: countries,
    });
  } catch (error) {
    yield put({
      type: Actions.FETCH_COUNTRY_ERROR,
    });
  }
}

/**
 * Fetch payment gateways saga
 * @returns {IterableIterator<*>}
 */
function* fetchPaymentGatewaySaga() {
  try {
    const countries = yield call(fetchPaymentGateways);
    yield put({
      type: Actions.FETCH_PAYMENT_GATEWAYS_SUCCESS,
      payload: countries,
    });
  } catch (error) {
    yield put({
      type: Actions.FETCH_PAYMENT_GATEWAYS_ERROR,
    });
  }
}

/**
 * Fetch shipping method not covered by zones saga
 * @returns {IterableIterator<*>}
 */
function* fetchShippingMethodNotCoveredByZonesSaga() {
  try {
    const data = yield call(fetchShippingZoneMethod, 0);
    yield put({
      type: Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE_ERROR,
    });
  }
}

export default function* commonSaga() {
  yield takeEvery(Actions.FETCH_COUNTRY, fetchCountrySaga);
  yield takeEvery(Actions.FETCH_PAYMENT_GATEWAYS, fetchPaymentGatewaySaga);
  yield takeEvery(Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE, fetchShippingMethodNotCoveredByZonesSaga);
}
