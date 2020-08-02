import * as Actions from '../constants';
import { fetchNewProducts, fetchSaleProducts, fetchProducts } from '../actions';

describe('Actions product', () => {
  it('get products', () => {
    const expectedAction = {
      type: Actions.GET_PRODUCT,
    };

    expect(fetchProducts()).toEqual(expectedAction);
  });

  it('get new product', () => {
    const expectedAction = {
      type: Actions.GET_NEW_PRODUCT,
    };

    expect(fetchNewProducts()).toEqual(expectedAction);
  });

  it('get sale product', () => {
    const expectedAction = {
      type: Actions.GET_SALE_PRODUCT,
    };

    expect(fetchSaleProducts()).toEqual(expectedAction);
  });
});
