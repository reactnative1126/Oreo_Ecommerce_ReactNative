import isNumber from 'lodash/isNumber';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import {fromJS} from 'immutable';
import {checkQuantity} from 'src/utils/product';

export const addCart = (lists, item) => {
  const {product_id, quantity, variation, meta_data} = item;
  // validate product_id and quantity
  if (
    !product_id ||
    !quantity ||
    !isNumber(product_id) ||
    !isNumber(quantity)
  ) {
    return lists;
  }
  const sortMetadata = sortBy(meta_data.toJS(), ['id', 'name']);
  const index = lists.findIndex(
    i =>
    {
      const metadataItem = i.get('meta_data').toJS();
      const sortMetadataItem = sortBy(metadataItem, ['id', 'name']);

      return i.get('product_id') === product_id &&
      i.getIn(['variation', 'id']) === variation.get('id') &&
      isEqual(sortMetadataItem, sortMetadata)
    }
  );
  // new item
  if (lists.size === 0 || index === -1) {
    return lists.push(fromJS(item));
  }
  // update quantity
  return lists.setIn(
    [index, 'quantity'],
    lists.getIn([index, 'quantity']) + quantity,
  );
};

export const checkItemAddCart = (lists, item) => {
  const {product_id, product, quantity, variation} = item;
  const data = variation && variation.size > 0 ? variation : product;
  // Item cart
  const cartItem = lists.find(
    value => value.getIn(['product', 'id']) === product_id,
  );

  // Check individually product
  if (data.get('sold_individually') && cartItem) {
    return {
      status: false,
      error: 'sold_individually',
    };
  }

  // Check quantity
  if (cartItem) {
    let check = checkQuantity(
      data.toJS(),
      cartItem.get('quantity') + quantity,
    );
    if (!check) {
      return {
        status: false,
        message: 'quantify',
      };
    }
  }
  return {status: true};
};
