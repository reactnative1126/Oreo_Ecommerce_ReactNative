import {put, call, takeEvery, select} from 'redux-saga/effects';
import * as Actions from './constants';

import {getCategories} from './service';
import {languageSelector} from '../common/selectors';

/**
 * Fetch data saga
 * @returns {IterableIterator<*>}
 */
function* fetchCategorySaga() {
  try {
    const lang = yield select(languageSelector);
    const query = {
      lang: lang
    };
    const data = yield call(getCategories, query);
    yield put({type: Actions.GET_CATEGORIES_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: Actions.GET_CATEGORIES_ERROR, error: e});
  }
}

export default function* categorySaga() {
  yield takeEvery(Actions.GET_CATEGORIES, fetchCategorySaga);
}
