import request from 'src/utils/fetch';
import queryString from 'query-string';
import pickBy from 'lodash/pickBy';

/**
 * Fetch product data
 * @returns {*}
 */

export const getProducts = (query, options = {}) =>
  request.get(`/wc/v3/products?${queryString.stringify(pickBy(query, item => item !== ""), { arrayFormat: 'comma' })}`, options);

/**
 * Fetch single product
 * @param id : product id
 * @returns {*}
 */
export const getSingleProduct = (id, lang) =>
  request.get(`/wc/v3/products/${id}?lang=${lang}`);

/**
 * Fetch single blog
 * @param id : blog id
 * @returns {*}
 */
export const getSingleBlog = (id, lang) =>
  request.get(`/wp/v2/posts/${id}?lang=${lang}`);

/**
 * Fetch single page
 * @param id : page id
 * @returns {*}
 */
export const getSinglePage = (id, lang) =>
    request.get(`/wp/v2/pages/${id}?lang=${lang}`);

/**
 * Get top sellers
 * @param query
 * @returns {*}
 */
export const topSellers = query => request.get(`/wc/v3/reports/top_sellers?${queryString.stringify(query)}`);

/**
 *  Get attributes
 * @returns {*}
 */
export const getAttributes = (lang) => request.get(`/wc/v3/products/attributes?lang=${lang}`);

/**
 *  Get attribute terms
 * @returns {*}
 */
export const getAttributeTerms = attribute_id => request.get(`/wc/v3/products/attributes/${attribute_id}/terms`);

/**
 *  Get product reviews
 * @returns {*}
 */
export const getProductReviews = product_id => request.get(`/wc/v3/products/reviews?product=${product_id}`);

/**
 *  Get rating product reviews
 * @returns {*}
 */
export const getRatingProductReviews = product_id => request.get(`/rnlab-app-control/v1/rating-count?product_id=${product_id}`);

/**
 *  Get rating product reviews
 * @returns {*}
 */
export const addProductReviews = data => request.post(`/rnlab-app-control/v1/reviews`, data);

/**
 *  Get product variations
 * @returns {*}
 */
export const getVariations = (product_id, lang, options = {}) => request.get(`/wc/v3/products/${product_id}/variations?lang=${lang}&per_page=100`, options);

/**
 *  Get product variations
 * @returns {*}
 */
export const getVariationId = (product_id, variation_id, lang, options = {}) => request.get(`/wc/v3/products/${product_id}/variations/${variation_id}?lang=${lang}`, options);
