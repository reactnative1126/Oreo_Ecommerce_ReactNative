import {fromJS} from 'immutable';

import * as Actions from './constants';

const initState = fromJS({
  data: {},
  isLoadingReview: false,
});

export default function vendorReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.FETCH_VENDOR_DETAIL:
      return state.set('data', fromJS({}));
    case Actions.FETCH_VENDOR_DETAIL_SUCCESS:
      return state
        .set('data', fromJS(action.data))
        .set('isRunFetchReview', false);
    case Actions.SET_LOADING_REVIEW:
      return state.set('isLoadingReview', true)
    default:
      return state;
  }
}
