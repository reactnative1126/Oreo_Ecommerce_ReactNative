// @flow
import * as Actions from './constants';

type Action = {
  type: string,
  payload: Object,
};

/**
 * Fetch products
 * @param data
 * @returns {{type: string, payload: {data: array}}}
 */
export function fetchProducts(data: Array<>): Action {
  return {
    type: Actions.FETCH_PRODUCT_SUCCESS,
    payload: {
      data,
    },
  };
}

/**
 * Fetch wish list
 * @param ids
 * @returns {{type: string, payload: {ids: array}}}
 */
export function fetchWishList(ids: Array<number>): Action {
  return {
    type: Actions.FETCH_WISHLIST,
    payload: {
      ids,
    },
  };
}

/**
 * Get product attributes
 * @returns {{type: string}}
 */
export function fetchProductAttributes() {
  return {
    type: Actions.GET_PRODUCT_ATTRIBUTE,
  };
}

/**
 * Sort by products
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function sortByProduct(payload) {
  return {
    type: Actions.SORT_BY_PRODUCT,
    payload,
  };
}

/**
 * Filter product
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function filterByProduct(payload) {
  return {
    type: Actions.FILTER_BY_PRODUCT,
    payload,
  };
}

/**
 * Clear filter
 * @returns {{type: string}}
 */
export function clearFilter() {
  return {
    type: Actions.CLEAR_FILTER,
  };
}

/**
 * Action add keyword
 * @param keyword
 * @returns {{type: string, payload: {keyword: string}}}
 */
export function addKeyword(keyword: string): Action {
  return {
    type: Actions.ADD_RECENT_KEYWORD,
    payload: {
      keyword,
    },
  };
}

/**
 * Action remove keyword
 * @param keyword
 * @returns {{type: string, payload: {keyword: string}}}
 */
export function removeKeyword(keyword: string): Action {
  return {
    type: Actions.REMOVE_RECENT_KEYWORD,
    payload: {
      keyword,
    },
  };
}

/**
 * Fetch rating
 * @param id
 * @returns {{type: string, payload: {id: number}}}
 */
export function fetchRating(id: number): Action {
  return {
    type: Actions.FETCH_RATING,
    payload: {
      id,
    },
  };
}

/**
 * Fetch review
 * @param id
 * @returns {{type: string, payload: {id: number}}}
 */
export function fetchReview(id: number): Action {
  return {
    type: Actions.FETCH_REVIEW,
    payload: {
      id,
    },
  };
}

/**
 * Add review
 * @param data
 * @param data
 * @returns {{type: string, payload: {id: number}}}
 */
export function addReview(data: object, cb = () => {
}): Action {
  return {
    type: Actions.ADD_REVIEW,
    payload: {
      data,
      cb,
    },
  };
}
