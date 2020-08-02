import {put, call, takeEvery, select} from 'redux-saga/effects';
import moment from 'moment';
import {showMessage} from 'react-native-flash-message';
import * as Actions from './constants';
import {getCoupons} from './service';
import {selectCartList} from './selectors';
import {handleError} from 'src/utils/error';
import {addCart, checkItemAddCart} from './helper';

/**
 * Add to cart saga
 * @returns {IterableIterator<*>}
 */
function* addToCartSaga({payload}) {
  let line_items = yield select(selectCartList);
  const {item, cb} = payload;
  const {status, message} = yield call(checkItemAddCart, line_items, item);
  if (!status) {
    const {product} = item;
    const notification = message
      ? {
          message: 'Can\'t change quantity',
          description: 'The quantity out of stock on store.',
        }
      : {
          message: `You cannot add another ${product.get('name')} to your cart.`
        };
    yield call(showMessage, {
      ...notification,
      type: 'danger',
    });
  } else {
    const {product} = item;
    line_items = addCart(line_items, item);
    showMessage({
      message: `"${product.get('name')}" have been added to your cart.`,
      type: 'success',
    });
    yield put({
      type: Actions.ADD_TO_CART_VALIDATED,
      payload: line_items,
    });
    yield call(cb);
  }
}

/**
 * Add list to cart saga
 * @returns {IterableIterator<*>}
 */
function* addListToCartSaga({payload}) {
  const line_items = yield select(selectCartList);
  let data = line_items;
  const dataList = payload.map(item => {
    const {status, message} = checkItemAddCart(line_items, item);
    if (!status) {
      return {
        status: false,
        message,
      };
    } else {
      data = addCart(data, item);
      const {product} = item;
      return {
        status: true,
        name: product.get('name'),
      };
    }
  });
  const filterSuccess = dataList.filter(v => v.status);
  let name = '';
  if (filterSuccess.length > 0) {
    const arrayName = filterSuccess.map(v => v.name);
    name = arrayName.join(' and ');
  }

  if (!data.equals(line_items)) {
    showMessage({
      message: `"${name}" have been added to your cart.`,
      type: 'success',
    });
    yield put({
      type: Actions.ADD_TO_CART_VALIDATED,
      payload: data,
    });
  }
}

function* addCouponSaga({payload}) {
  try {
    const data = yield call(getCoupons, {code: payload.code});
    let checkCoupon = true;
    if (!data || data.length < 1) {
      checkCoupon = false;
    } else {
      const coupon = data[0];
      if (
        moment(coupon.date_expires).isBefore(moment()) ||
        (coupon.usage_count &&
          coupon.usage_limit &&
          coupon.usage_count === coupon.usage_limit)
      ) {
        checkCoupon = false;
      }
    }
    if (!checkCoupon) {
      yield call(handleError, {
        message: 'Please check code again',
      });
    } else {
      yield put({
        type: Actions.ADD_COUPON_SUCCESS,
        payload: payload,
      });
    }
  } catch (e) {
    yield call(handleError, e);
  }
}
export default function* cartSaga() {
  yield takeEvery(Actions.ADD_TO_CART, addToCartSaga);
  yield takeEvery(Actions.ADD_TO_CART_LIST, addListToCartSaga);
  yield takeEvery(Actions.ADD_COUPON, addCouponSaga);
}
