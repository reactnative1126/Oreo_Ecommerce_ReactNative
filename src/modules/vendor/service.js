import request from 'src/utils/fetch';
import queryString from 'query-string';

/**
 * Fetch vendor data
 * @returns {*}
 */

export const getVendor = vendor_id =>
  request.get(`/dokan/v1/stores/${vendor_id}`);

/**
 * Fetch products by vendor id
 * @returns {*}
 */

export const getProductsByVendorId = (vendor_id, query) =>
  request.get(
    `/dokan/v1/stores/${vendor_id}/products?${queryString.stringify(query, {
      arrayFormat: 'comma',
    })}`,
  );

/**
 * Fetch list vendor
 * @returns {*}
 */

export const getVendors = query =>
  request.get(
    `/dokan/v1/stores?${queryString.stringify(query, {
      arrayFormat: 'comma',
    })}`,
  );

/**
 * Fetch review by vendor id
 * @returns {*}
 */

export const getReviewByVendorId = (vendor_id, query) => {
    return request.get(
        `dokan/v1/stores/${vendor_id}/reviews?${queryString.stringify(query, {
            arrayFormat: 'comma',
        })}`,
    );
}


/**
 * Send contact for vendor
 * @returns {*}
 */

export const sendContactVendorId = (vendor_id, data) =>
  request.post(
    `/dokan/v1/stores/${vendor_id}/contact`,
    data,
  );

/**
 * Send review for vendor id
 * @returns {*}
 */

export const sendReviewVendorId = (vendor_id, data) =>
  request.post(`/dokan/v1/stores/${vendor_id}/reviews`, data);
