import * as Actions from './constants';

/**
 * Fetch Categories
 * @returns {{type: string}}
 */
export function fetchCategories() {
  return {
    type: Actions.GET_CATEGORIES,
  };
}
