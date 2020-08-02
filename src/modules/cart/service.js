import request from 'src/utils/fetch';
import queryString from 'query-string';

/**
 * Fetch all the shipping methods.
 * @returns {*}
 */
export const fetchShippingMethod = () => request.get(`/wc/v3/shipping_methods`);

/**
 * Fetch all the shipping methods from a shipping zone.
 * @param id
 * @returns {*}
 */
export const fetchShippingZoneMethod = id => request.get(`/wc/v3/shipping/zones/${id}/methods`);

/**
 * Fetch all the locations of a shipping zone.
 * @param id
 * @returns {*}
 */
export const fetchShippingLocaltionMethod = id => request.get(`/wc/v3/shipping/zones/${id}/locations`);

/**
 * Get Continent by Country code
 * @param cc: country code
 * @returns {*}
 */
export const getContinentCode = cc => request.get(`/rnlab-app-control/v1/get-continent-code-for-country?cc=${cc}`);

/**
 * Get Zones
 * @returns {*}
 */
export const getZones = () => request.get(`/rnlab-app-control/v1/zones`);

/**
 * Get Zones
 * @returns {*}
 */
export const getCoupons = (query) => request.get(`/wc/v3/coupons?${queryString.stringify(query, { arrayFormat: 'comma' })}`);
