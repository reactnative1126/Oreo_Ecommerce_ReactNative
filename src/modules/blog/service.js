import request from 'src/utils/fetch';
import queryString from 'query-string';

/**
 * Fetch blog data
 * @returns {*}
 */

export const getBlogs = query =>
  request.get(`/wp/v2/posts?${queryString.stringify(query, { arrayFormat: 'comma' })}`);
