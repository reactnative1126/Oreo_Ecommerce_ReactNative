import {createSelector} from 'reselect';

export const vendor = state => state.vendor;

// get data detail vendor
export const detailVendorSelector = createSelector(
  vendor,
  data => data.get('data'),
);

// get value loading Review vendor
export const isLoadingReviewSelector = createSelector(
  vendor,
  data => data.get('isLoadingReview'),
);
