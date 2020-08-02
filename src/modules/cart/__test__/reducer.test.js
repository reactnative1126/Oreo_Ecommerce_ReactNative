import { fromJS } from 'immutable';
import cartReducer, { initState } from '../reducer';
import { addToCart, changeQuantity, removeCart } from '../actions';

describe('Reducer add to cart', () => {
  it('should handle init cart reducer', () => {
    const action = {};
    const state = cartReducer(undefined, action);
    expect(state.toJS()).toStrictEqual(initState.toJS());
  });

  // Add to cart
  it('should handle add to cart', () => {
    const item = {
      product_id: 1,
      quantity: 1,
    };
    const action = addToCart(item);
    const state = cartReducer(undefined, action);
    expect(state.get('line_items').size).toBe(1);
  });

  it('should handle add to cart with same id', () => {
    const item = {
      product_id: 1,
      quantity: 2,
    };
    const currentState = initState.update('line_items', line_items =>
      line_items.push(fromJS(item))
    );
    const action = addToCart(item);
    const state = cartReducer(currentState, action);
    expect(state.get('line_items').size).toBe(1);
    expect(state.getIn(['line_items', 0, 'quantity'])).toBe(4);
  });

  it('should validate quantity and product_id', () => {
    const item = {};
    const action = addToCart(item);
    const state = cartReducer(initState, action);
    expect(state.get('line_items').size).toBe(0);
  });

  it('should handle invalid value', () => {
    const item = {
      product_id: '123123',
      quantity: 2,
    };
    const action = addToCart(item);
    const state = cartReducer(initState, action);
    expect(state.get('line_items').size).toBe(0);

    const item2 = {
      product_id: '123123',
      quantity: '2342',
    };
    const action2 = addToCart(item2);
    const state2 = cartReducer(initState, action2);
    expect(state2.get('line_items').size).toBe(0);
  });

  it('should handle change quantity', () => {
    const item = {
      product_id: 1,
      quantity: 1,
    };
    const action = addToCart(item);
    const state = cartReducer(initState, action);

    const action2 = changeQuantity(fromJS(item), 10);
    const state2 = cartReducer(state, action2);

    expect(state2.getIn(['line_items', 0, 'quantity'])).toBe(10);
  });

  it('should handle remove item', () => {
    const item = {
      product_id: 1,
      quantity: 1,
    };
    const action = addToCart(item);
    const state = cartReducer(initState, action);

    const action2 = removeCart(fromJS(item));
    const state2 = cartReducer(state, action2);

    expect(state2.get('line_items').size).toBe(0);
  });
});
