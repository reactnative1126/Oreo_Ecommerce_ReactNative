import {fromJS} from 'immutable';
import moment from 'moment';
import round from 'lodash/round';
import currencyFormatter from './currency-formatter';

export function percentSaleProduct(regular_price, sale_price) {
    if (!regular_price || !sale_price) {
        return 0;
    }
    const floatRegular = parseFloat(regular_price);
    const floatSale = parseFloat(sale_price);
    const percent = floatRegular && floatSale
        ? round(((floatRegular - floatSale) * 100)/floatRegular)
        : 0;
    return percent;
}
/**
 * Prepare product item
 * @param item List
 * @param currency string
 * @param defaultCurrency string
 * @returns {*}
 */
export function prepareProductItem(item, currency, defaultCurrency, days = 5) {
  let regular_price =
    currency === defaultCurrency
      ? item.get('regular_price')
      : item.getIn(['multi-currency-prices', currency, 'regular_price']);
  let sale_price =
    currency === defaultCurrency
      ? item.get('sale_price')
      : item.getIn(['multi-currency-prices', currency, 'sale_price']);
  let priceFormat = {
    regular_price: parseFloat(regular_price) && parseFloat(regular_price) > 0 ? currencyFormatter(regular_price, currency) : '',
    sale_price: parseFloat(sale_price) && parseFloat(sale_price) > 0 ? currencyFormatter(sale_price, currency) : '',
    percent_sale: percentSaleProduct(item.get('regular_price'), item.get('sale_price')),
  };

  if (item.get('type') === 'variable' || item.get('type') === 'grouped') {
    let price =
      currency === defaultCurrency ? item.get('price') : item.getIn(['from-multi-currency-prices', currency, 'price']);
    priceFormat = {
      regular_price: parseFloat(price) && parseFloat(price) > 0 ? currencyFormatter(price, currency) : '',
      sale_price: '',
      percent_sale: 0
    };
  }
  const isNew = moment(item.get('date_created')).add(days+1, 'day').isAfter(moment());
  const rating = parseFloat(item.get('average_rating'));
  return item
    .set('price_format', fromJS(priceFormat))
    .set('is_new', isNew)
    .set('average_rating', rating.toFixed(1));
}

/**
 * Calc cost for shipping order
 * @param method
 * @param order
 * @returns {*}
 */
export function calcCost(method, order) {
  // The cost product was complex, we do simple first then update on the future
  return method.settings && method.settings.cost && method.settings.cost.value ? method.settings.cost.value : '0';
}

/**
 * Check quantity
 * @param product
 * @param quantity: number item of product in cart
 */
export function checkQuantity(product, quantity) {
  let check = false;

  if (product.manage_stock) {

    if (product.stock_quantity >= quantity) {
      check = true;
    }

    if (product.backorders === 'yes' || product.backorders === 'notify') {
      check = true;
    }

  } else {
    if (product.stock_status === 'instock' || product.stock_status === 'onbackorder') {
      check = true;
    }
  }
  return check;
}
