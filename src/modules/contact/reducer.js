import { fromJS } from 'immutable';

import * as Actions from './constants';

const initState = fromJS({
  data: [],
  loading: false,
  pending: false,
  contactError: {
    message: '',
    errors: {},
  },
});

export default function contactReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.FETCH_CONTACT:
      return state.set('loading', true);
    case Actions.FETCH_CONTACT_SUCCESS:
      return state.set('loading', false).set('data', action.payload);
    case Actions.FETCH_CONTACT_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}
