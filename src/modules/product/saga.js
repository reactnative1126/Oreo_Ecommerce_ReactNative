import { put, call, takeEvery, select } from 'redux-saga/effects';
import * as Actions from './constants';

import { languageSelector } from 'src/modules/common/selectors';
import { isLoginSelector } from 'src/modules/auth/selectors';
import { getProducts, getAttributes, getRatingProductReviews, getProductReviews, addProductReviews } from './service';
import { fetchRating, fetchReview} from './actions';

import { showMessage } from "react-native-flash-message";
import { handleError } from 'src/utils/error';

/**
 * Fetch wish list saga
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* fetchWishListSaga({ payload }) {
  try {
    if (!payload.ids || payload.ids.length === 0) {
      yield put({ type: Actions.FETCH_WISHLIST_SUCCESS, payload: [] });
    }
    const query = {
      include: payload.ids,
      per_page: payload.ids.length,
    };
    const data = yield call(getProducts, query);
    yield put({ type: Actions.FETCH_WISHLIST_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: Actions.FETCH_WISHLIST_ERROR, error: e });
  }
}

/**
 * Get product attributes saga
 * @returns {IterableIterator<*>}
 */
function* fetchProductAttributesSaga() {
  try {
    const lang = yield select(languageSelector);
    const data = yield call(getAttributes, lang);
    yield put({ type: Actions.GET_PRODUCT_ATTRIBUTE_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: Actions.GET_PRODUCT_ATTRIBUTE_ERROR, error: e });
  }
}

/**
 * Fetch rating saga
 * @returns {IterableIterator<*>}
 */
function* fetchRatingSaga({ payload }) {
  try {
    const { id } = payload;
    const data = yield call(getRatingProductReviews, id);
    yield put({ type: Actions.FETCH_RATING_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: Actions.FETCH_RATING_ERROR, error: e });
  }
}

/**
 * Fetch reviews saga
 * @returns {IterableIterator<*>}
 */
function* fetchReviewSaga({ payload }) {
  try {
    const { id } = payload;
    const data = yield call(getProductReviews, id);
    yield put({ type: Actions.FETCH_REVIEW_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: Actions.FETCH_REVIEW_ERORR, error: e });
  }
}

/**
 * Add review saga
 * @returns {IterableIterator<*>}
 */
function* addReviewSaga({ payload }) {
  try {
    const isLogin = yield select(isLoginSelector);
    const { data, cb} = payload;
    const result =  yield call(addProductReviews, data);
    if (result) {
      yield put({ type: Actions.ADD_REVIEW_SUCCESS });
      yield put(fetchRating(data.product_id));
      yield put(fetchReview(data.product_id));
      yield call(showMessage, {
        duration: 3000,
        message: isLogin ? "Submitted review successfully" : "Submitted review successfully, waiting for Admin to approve it.",
        type: "success",
      });
      yield call(cb);
    } else {
      yield put({ type: Actions.ADD_REVIEW_ERROR });
    }
  } catch (e) {
    yield call(handleError, e);
    yield put({ type: Actions.ADD_REVIEW_ERROR, error: e });
  }
}

export default function* productSaga() {
  yield takeEvery(Actions.FETCH_WISHLIST, fetchWishListSaga);
  yield takeEvery(Actions.GET_PRODUCT_ATTRIBUTE, fetchProductAttributesSaga);
  yield takeEvery(Actions.FETCH_RATING, fetchRatingSaga);
  yield takeEvery(Actions.FETCH_REVIEW, fetchReviewSaga);
  yield takeEvery(Actions.ADD_REVIEW, addReviewSaga);
}
