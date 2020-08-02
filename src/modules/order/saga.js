import { put, call, takeEvery, select } from 'redux-saga/effects';

import { Map } from 'immutable';

import * as Actions from './constants';
import { createOrder, updateOrder, deleteOrder, refundOrder } from './service';
import { rootCart } from 'src/modules/cart/selectors';
import { selectOrder } from 'src/modules/order/selectors';
import { userIdSelector } from 'src/modules/auth/selectors';
import { currencySelector, defaultCurrencySelector, listCurrencySelector } from 'src/modules/common/selectors';
// import { clearCart } from 'src/modules/cart/actions';
import { showMessage } from "react-native-flash-message";
import { handleError } from 'src/utils/error';

function* createOrderSaga() {
  try {
    const data = yield select(rootCart);
    const currency = yield select(currencySelector);
    const defaultCurrency = yield select(defaultCurrencySelector);
    const currencies = yield select(listCurrencySelector);
    const customer_id = yield select(userIdSelector);

    const prepareData = data
      .update('line_items', line_items => {
        return line_items.map(item => {
          const isVariation = !!item.getIn(['variation', 'id']);
          // currency change
          if (defaultCurrency !== currency) {
            // With variation product
            if (isVariation) {
              const regular_price = item.getIn(['variation', 'multi-currency-prices', currency, 'regular_price'], 0);
              const sale_price = item.getIn(['variation', 'multi-currency-prices', currency, 'sale_price'], 0);
              return {
                product_id: item.get('product_id'),
                quantity: item.get('quantity'),
                total: `${sale_price ? sale_price * item.get('quantity') : regular_price * item.get('quantity')}`,
                meta_data: item.get('meta_data').map(md => ({key: md.get('key'), value: md.get('name')})),
                variation_id: item.getIn(['variation', 'id'])
              };
            }

            const product = item.get('product');
            // With single product
            const regular_price = product.getIn(['multi-currency-prices', currency, 'regular_price'], 0);
            const sale_price = product.getIn(['multi-currency-prices', currency, 'sale_price'], 0);
            return {
              product_id: item.get('product_id'),
              quantity: item.get('quantity'),
              total: `${sale_price ? sale_price * item.get('quantity') : regular_price * item.get('quantity')}`
            };
          }
          if (isVariation) {
            return {
              product_id: item.get('product_id'),
              quantity: item.get('quantity'),
              meta_data: item.get('meta_data').map(md => ({key: md.get('key'), value: md.get('name')})),
              variation_id: item.getIn(['variation', 'id'], null)
            };
          }
          return {
            product_id: item.get('product_id'),
            quantity: item.get('quantity'),
          };
        });
      })
      .updateIn(['shipping_lines', 0,], shipping => {
        let total = shipping.get('total');
        if (currency !== defaultCurrency) {
          total = `${currencies.getIn([currency, 'rate'], 0) * total}`;
        }
        return Map({
          total,
          method_id: shipping.get('method_id'),
          method_title: shipping.get('method_title'),
        });
      })
      .set('customer_id', customer_id ? parseInt(customer_id) : 0)
      .set('currency', currency)
      .toJS();

    console.log(prepareData);

    const order = yield call(createOrder, prepareData);
    yield put({
      type: Actions.CREATE_ORDER_SUCCESS,
      payload: order,
    });
    // yield put(clearCart());
  } catch (e) {
    yield put({
      type: Actions.CREATE_ORDER_ERROR,
    });
    yield call(handleError, e);
  }
}

function* updateOrderSaga({ payload }) {
  try {
    const {id} = payload;
    yield call(deleteOrder, id);
    yield put({
      type: Actions.CREATE_ORDER,
    });
    yield put({
      type: Actions.UPDATE_ORDER_SUCCESS,
    });
    // const cart = yield select(rootCart);
    // const currency = yield select(currencySelector);
    // const defaultCurrency = yield select(defaultCurrencySelector);
    // const currencies = yield select(listCurrencySelector);
    // const customer_id = yield select(userIdSelector);
    // // const order = yield select(selectOrder);
    //
    // const shipping_lines = cart
    //   .get('shipping_lines')
    //   .updateIn([0, 'total'], total => {
    //     if (currency !== defaultCurrency) {
    //       return `${currencies.getIn([currency, 'rate'], 0) * total}`;
    //     }
    //     return total;
    //   });
    //
    // const line_items = cart.get('line_items').map(item => {
    //   const isVariation = !!item.getIn(['variation', 'id']);
    //   // currency change
    //   if (defaultCurrency !== currency) {
    //     // With variation product
    //     if (isVariation) {
    //       const regular_price = item.getIn(['variation', 'multi-currency-prices', currency, 'regular_price'], 0);
    //       const sale_price = item.getIn(['variation', 'multi-currency-prices', currency, 'sale_price'], 0);
    //       return {
    //         product_id: item.get('product_id'),
    //         quantity: item.get('quantity'),
    //         total: `${sale_price ? sale_price * item.get('quantity') : regular_price * item.get('quantity')}`,
    //         meta_data: item.get('meta_data').map(md => ({key: md.get('key'), value: md.get('name')})),
    //         variation_id: item.getIn(['variation', 'id'])
    //       };
    //     }
    //     const product = item.get('product');
    //     // With single product
    //     const regular_price = product.getIn(['multi-currency-prices', currency, 'regular_price'], 0);
    //     const sale_price = product.getIn(['multi-currency-prices', currency, 'sale_price'], 0);
    //
    //     return {
    //       product_id: item.get('product_id'),
    //       quantity: item.get('quantity'),
    //       total: `${sale_price ? sale_price * item.get('quantity') : regular_price * item.get('quantity')}`
    //     };
    //   }
    //   if (isVariation) {
    //     return {
    //       product_id: item.get('product_id'),
    //       quantity: item.get('quantity'),
    //       meta_data: item.get('meta_data').map(md => ({key: md.get('key'), value: md.get('name')})),
    //       variation_id: item.getIn(['variation', 'id'], null)
    //     };
    //   }
    //   return {
    //     product_id: item.get('product_id'),
    //     quantity: item.get('quantity'),
    //   };
    // });
    //
    // let dataUpdate = Map()
    //   .set('currency', currency)
    //   .set('customer_id', customer_id ? parseInt(customer_id) : 0)
    //   .set('customer_note', cart.get('customer_note'))
    //   .set('billing', cart.get('billing'))
    //   .set('shipping', cart.get('shipping'))
    //   .set('payment_method', cart.get('payment_method'))
    //   .set('payment_method_title', cart.get('payment_method_title'))
    //   .set('coupon_lines', cart.get('coupon_lines'))
    //   .set('shipping_lines', shipping_lines)
    //   .set('line_items', line_items);
    //
    // const orderUpdate = yield call(updateOrder, id, dataUpdate.toJS());
    // yield put({
    //   type: Actions.UPDATE_ORDER_SUCCESS,
    //   payload: orderUpdate,
    // });
  } catch (e) {
    yield put({
      type: Actions.UPDATE_ORDER_ERROR,
      error: e,
    });
    yield call(handleError, e);
  }
}

function* refundOrderSaga({ payload }) {
  try {
    const { id, amount } = payload;
    yield call(refundOrder, id, amount);
    yield call(showMessage, {
      message: "Refund order success.",
      type: "success",
    });
    yield put({
      type: Actions.REFUND_ORDER_SUCCESS,
    });
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.REFUND_ORDER_ERROR,
    });
  }
}

export default function* orderSaga() {
  yield takeEvery(Actions.CREATE_ORDER, createOrderSaga);
  yield takeEvery(Actions.UPDATE_ORDER, updateOrderSaga);
  yield takeEvery(Actions.REFUND_ORDER, refundOrderSaga);
}
