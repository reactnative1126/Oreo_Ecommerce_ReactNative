import {fromJS, Set} from 'immutable';

import * as Actions from './constants';

const resultTypeInit = {
  '5': 0,
  '4': 0,
  '3': 0,
  '2': 0,
  '1': 0,
};

const initState = fromJS({
  data: [],
  error: null,
  sortBy: {},
  filterBy: {
    category: '',
    attribute: '',
    attribute_term: [],
    // tag: '',
    min_price: '',
    max_price: '',
    min: '',
    max: '',
    search: '',
  },
  attribute: {
    loading: false,
    data: [],
  },
  recent: Set(),
  reviews: {
    loading: false,
    loadingAdd: false,
    data: [],
    resultType: resultTypeInit,
  },
});

export default function productReducer(state = initState, {type, payload, error}) {
  switch (type) {

    // Get wish list products
    case Actions.FETCH_PRODUCT_SUCCESS:
      return state.set('data', fromJS(payload.data));
    // Get wish list products
    case Actions.FETCH_WISHLIST:
      return state.setIn(['wish', 'loading'], true);
    case Actions.FETCH_WISHLIST_SUCCESS:
      return state.setIn(['wish', 'loading'], false).setIn(['wish', 'data'], fromJS(payload));
    case Actions.FETCH_WISHLIST_ERROR:
      return state.setIn(['wish', 'loading'], false).setIn(['wish', 'error'], error);

    // get attributes
    case Actions.GET_PRODUCT_ATTRIBUTE:
      return state.setIn(['attribute', 'loading'], true);
    case Actions.GET_PRODUCT_ATTRIBUTE_SUCCESS:
      return state.setIn(['attribute', 'loading'], false).setIn(['attribute', 'data'], fromJS(payload));
    case Actions.GET_PRODUCT_ATTRIBUTE_ERROR:
      return state.setIn(['attribute', 'loading'], false).setIn(['attribute', 'error'], error);

    // Get rating products
    case Actions.FETCH_RATING:
      return state.setIn(['reviews', 'resultType'], fromJS(resultTypeInit));
    case Actions.FETCH_RATING_SUCCESS:
      return state.setIn(['reviews', 'resultType'], fromJS(payload));

    // Get review products
    case Actions.FETCH_REVIEW:
      return state
        .setIn(['reviews', 'loading'], true)
        .setIn(['reviews', 'data'], fromJS([]));
    case Actions.FETCH_REVIEW_SUCCESS:
      return state
        .setIn(['reviews', 'loading'], false)
        .setIn(['reviews', 'data'], fromJS(payload));
    case Actions.FETCH_REVIEW_ERORR:
      return state.setIn(['reviews', 'loading'], false);

    // Add review products
    case Actions.ADD_REVIEW:
      return state.setIn(['reviews', 'loadingAdd'], true);
    case Actions.ADD_REVIEW_SUCCESS:
    case Actions.ADD_REVIEW_ERROR:
      return state.setIn(['reviews', 'loadingAdd'], false);

    // Sort by
    case Actions.SORT_BY_PRODUCT:
      return state.set('sortBy', payload);

    // Sort by
    case Actions.FILTER_BY_PRODUCT:
      return state.set('filterBy', state.get('filterBy').merge(payload));

    // Clear filter
    case Actions.CLEAR_FILTER:
      return state.set('filterBy', initState.get('filterBy')).set('sortBy', initState.get('sortBy'));

    // Recent search
    case Actions.ADD_RECENT_KEYWORD:
      return state.update('recent', keywords => keywords.add(payload.keyword));

    case Actions.REMOVE_RECENT_KEYWORD:
      return state.update('recent', keywords => keywords.remove(payload.keyword));
    default:
      return state;
  }
}
