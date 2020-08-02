import * as Actions from './constants';

/**
 * Fetch user
 * @returns {{type: string}}
 */
export function fetchContacts() {
  return {
    type: Actions.FETCH_CONTACT,
  };
}
