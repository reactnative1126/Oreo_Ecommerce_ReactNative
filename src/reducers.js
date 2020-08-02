import { combineReducers } from 'redux';

import authReducer from './modules/auth/reducer';
import categoryReducer from './modules/category/reducer';
import productReducer from './modules/product/reducer';
import commonReducer from './modules/common/reducer';
import cartReducer from './modules/cart/reducer';
import orderReducer from './modules/order/reducer';
import vendorReducer from './modules/vendor/reducer';

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
  common: commonReducer,
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  vendor: vendorReducer,
});

export default rootReducers;
