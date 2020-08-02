import Sentry from 'sentry-expo';
import { put, call, takeEvery, select } from 'redux-saga/effects';

import * as Actions from './constants';
import { authSelector } from '../auth/selectors';

import { getContacts } from './service';

/**
 * Fetch data saga
 * @returns {IterableIterator<*>}
 */
function* fetchContactSaga() {
  try {
    const { user } = yield select(authSelector);
    const data = yield call(getContacts);
    const dataUser = [];
    if (data.length > 0) {
      data.map(dataChat => {
        const userChat =
          dataChat.m_from_id === user.id
            ? dataChat.user_to
            : dataChat.m_to_id
            ? dataChat.user_from
            : null;
        if (userChat) {
          dataUser.push({
            ...dataChat,
            user_chat: userChat,
          });
        }
      });
    }
    yield put({ type: Actions.FETCH_CONTACT_SUCCESS, payload: dataUser });
  } catch (e) {
    yield put({ type: Actions.FETCH_CONTACT_ERROR, error: e });
    Sentry.captureException(e);
  }
}

export default function* contactSaga() {
  yield takeEvery(Actions.FETCH_CONTACT, fetchContactSaga);
}
