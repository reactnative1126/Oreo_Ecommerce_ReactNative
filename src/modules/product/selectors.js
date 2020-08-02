import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import round from 'lodash/round'
import { prepareProductItem } from 'src/utils/product';

import { currencySelector, defaultCurrencySelector } from 'src/modules/common/selectors';

export const product = state => state.product;

// Wish list products selector
export const loadingWishListSelector = createSelector(
  product,
  data => data.getIn(['wish', 'loading'])
);

export const dataWishListSelector = createSelector(
  state => state.product.getIn(['wish', 'data']),
  currencySelector,
  defaultCurrencySelector,
  (data, currency, defaultCurrency) => {
    if (data) {
      // no need get days in prepareProductItem
      const prepareData = data.map(item => prepareProductItem(item, currency, defaultCurrency));
      return prepareData;
    }

    return fromJS([]);
  }
);

// Select sortBy
export const sortBySelector = createSelector(
  product,
  data => data.get('sortBy')
);

// Select filterBy
export const filterBySelector = createSelector(
  product,
  data => data.get('filterBy')
);

// Select attribute
export const attributeSelector = createSelector(
  product,
  data => data.get('attribute')
);

// Select price ranges
export const priceRangesSelector = createSelector(
  state => state.product.get('data'),
  state => state.product.getIn(['filterBy', 'min']),
  state => state.product.getIn(['filterBy', 'max']),
  (data, min, max) => {
    const productMin =
      data && data.size && data.minBy(value => value.get('price'))
        ? data.minBy(value => parseFloat(value.get('price') || '0'))
        : null;
    const productMax =
      data && data.size && data.maxBy(value => value.get('price'))
        ? data.maxBy(value => parseFloat(value.get('price') || '0'))
        : null;
    const minBy = productMin ? productMin.get('price') : '0';
    const maxBy = productMax ? productMax.get('price') : (parseFloat(minBy) + 99).toString();
    return {
      min: min ? min : minBy,
      max: max ? max : maxBy,
    };
  }
);

// Select Recent search
export const recentSearch = createSelector(
  state => state.product.get('recent'),
  data => data.toJS()
);

// Get rating
export const dataRatingSelector = createSelector(
  state => state.product.get('reviews'),
  data => {
    const objRating = data.get('resultType');
    let lists = [];
    let totalRating = 0;
    let totalVoting = 0;

    objRating.mapKeys((value) => {
      const numberRatingType = objRating.get(value)? objRating.get(value) : 0;
      totalVoting = totalVoting + numberRatingType;
      totalRating = totalRating + parseInt(value) * numberRatingType;
      lists.push({
        key: parseInt(value),
        value: numberRatingType,
      });
    });
    const rating = totalVoting ? parseFloat(totalRating/totalVoting): 0;
    return {
      lists: lists,
      rating: round(rating, 1),
      total: totalVoting,
    }
  }
);

// Get review
export const dataReviewSelector = createSelector(
  state => state.product.get('reviews'),
  data => data
);
