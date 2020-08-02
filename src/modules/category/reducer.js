import { fromJS } from 'immutable';

import * as Actions from './constants';

const initState = fromJS({
  data: [],
  loading: false,
});

export default function categoryReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.GET_CATEGORIES:
      return state.set('loading', true);
    case Actions.GET_CATEGORIES_SUCCESS:
      return state.set('loading', false).set('data', fromJS(action.payload));
    case Actions.GET_CATEGORIES_ERROR:
      return state.set('loading', false).set('data', initState.get('data'));
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState;
    default:
      return state;
  }
}
