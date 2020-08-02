import productReducer from '../reducer';

import { fetchNewProducts, fetchSaleProducts, fetchProducts } from '../actions';
import * as Actions from '../constants';

describe('Reducer product', () => {
  it('should handle when app init', () => {
    const initState = undefined;
    const action = {};

    const state = productReducer(initState, action);

    expect(state.get('data').size).toBe(0);
    expect(state.get('loading')).toBeFalsy();
    expect(state.get('error')).toBeNull();

    expect(state.getIn(['new', 'data']).size).toBe(0);
    expect(state.getIn(['new', 'loading'])).toBeFalsy();
    expect(state.getIn(['new', 'error'])).toBeNull();

    expect(state.getIn(['sale', 'data']).size).toBe(0);
    expect(state.getIn(['sale', 'loading'])).toBeFalsy();
    expect(state.getIn(['sale', 'error'])).toBeNull();
  });

  // Fetch products
  it('should handle fetch product', () => {
    const initState = undefined;
    const action = fetchProducts();

    const state = productReducer(initState, action);

    expect(state.get('data').size).toBe(0);
    expect(state.get('loading')).toBeTruthy();
    expect(state.get('error')).toBeNull();
  });

  it('should handle fetch product success', () => {
    const initState = undefined;
    const action = {
      type: Actions.GET_PRODUCT_SUCCESS,
      payload: [
        { id: 1, name: 'Product name 1' },
        { id: 2, name: 'Product name 2' },
      ],
    };

    const state = productReducer(initState, action);

    expect(state.get('data').size).toBe(2);
    expect(state.get('loading')).toBeFalsy();
    expect(state.get('error')).toBeNull();
  });

  it('should handle fetch product error', () => {
    const initState = undefined;

    const error = new Error('Something wrong');

    const action = {
      type: Actions.GET_PRODUCT_ERROR,
      error: error,
    };

    const state = productReducer(initState, action);

    expect(state.get('loading')).toBeFalsy();
    expect(state.get('error')).toBe(error);
  });

  // Fet new product
  it('should handle fetch new product', () => {
    const initState = undefined;
    const action = fetchNewProducts();

    const state = productReducer(initState, action);

    expect(state.getIn(['new', 'data']).size).toBe(0);
    expect(state.getIn(['new', 'loading'])).toBeTruthy();
    expect(state.getIn(['new', 'error'])).toBeNull();
  });

  it('should handle fetch new product success', () => {
    const initState = undefined;
    const action = {
      type: Actions.GET_NEW_PRODUCT_SUCCESS,
      payload: [
        { id: 1, name: 'Product name 1' },
        { id: 2, name: 'Product name 2' },
      ],
    };

    const state = productReducer(initState, action);

    expect(state.getIn(['new', 'data']).size).toBe(2);
    expect(state.getIn(['new', 'data', 0, 'id'])).toBe(1);
    expect(state.getIn(['new', 'loading'])).toBeFalsy();
    expect(state.getIn(['new', 'error'])).toBeNull();
  });

  it('should handle fetch new product error', () => {
    const initState = undefined;

    const error = new Error('Something wrong');

    const action = {
      type: Actions.GET_NEW_PRODUCT_ERROR,
      error: error,
    };

    const state = productReducer(initState, action);

    expect(state.getIn(['new', 'loading'])).toBeFalsy();
    expect(state.getIn(['new', 'error'])).toBe(error);
  });

  // Sale product
  it('should handle fetch sale product', () => {
    const initState = undefined;
    const action = fetchSaleProducts();

    const state = productReducer(initState, action);

    expect(state.getIn(['sale', 'data']).size).toBe(0);
    expect(state.getIn(['sale', 'loading'])).toBeTruthy();
    expect(state.getIn(['sale', 'error'])).toBeNull();
  });

  it('should handle fetch sale product success', () => {
    const initState = undefined;
    const action = {
      type: Actions.GET_SALE_PRODUCT_SUCCESS,
      payload: [
        { id: 1, name: 'Product name 1' },
        { id: 2, name: 'Product name 2' },
      ],
    };

    const state = productReducer(initState, action);

    expect(state.getIn(['sale', 'data']).size).toBe(2);
    expect(state.getIn(['sale', 'data', 0, 'id'])).toBe(1);
    expect(state.getIn(['sale', 'loading'])).toBeFalsy();
    expect(state.getIn(['sale', 'error'])).toBeNull();
  });

  it('should handle fetch sale product error', () => {
    const initState = undefined;

    const error = new Error('Something wrong');

    const action = {
      type: Actions.GET_SALE_PRODUCT_ERROR,
      error: error,
    };

    const state = productReducer(initState, action);

    expect(state.getIn(['sale', 'loading'])).toBeFalsy();
    expect(state.getIn(['sale', 'error'])).toBe(error);
  });
});
