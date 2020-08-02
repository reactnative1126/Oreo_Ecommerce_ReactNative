import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {withNavigation} from 'react-navigation';
import unescape from 'lodash/unescape';
import {fromJS, List, Map} from 'immutable';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {withTheme, Image, Text} from 'src/components';
import Price from '../Price';
import Button from '../Button';

import {addToCart} from 'src/modules/cart/actions';
import {configsSelector} from 'src/modules/common/selectors';
import {mainStack} from 'src/config/navigator';

import {SIMPLE} from 'src/config/product';
import {padding, margin} from 'src/components/config/spacing';
import {sizes} from 'src/components/config/fonts';
import {white, black} from 'src/components/config/colors';

const stockStatusList = ['instock', 'onbackorder'];

const ItemWishlist = React.memo(props => {
  const {t} = useTranslation();
  const {item, theme, style, navigation, handleAddToCart, configs} = props;
  const {
    name,
    images,
    price_format,
    type,
    id,
    purchasable,
    stock_status,
  } = item;

  const goProductDetail = () =>
    navigation.navigate(mainStack.product, {
      product: item,
    });

  const getAddToCart = () =>
    handleAddToCart({
      product_id: id,
      quantity: 1,
      variation: Map(),
      product: fromJS(item),
      meta_data: List(),
    });
  const titleButton =
    type === SIMPLE ? t('common:text_add_cart') : t('common:text_choose_item');
  return (
    <View style={{backgroundColor: theme.ProductItem2.backgroundColor}}>
      <TouchableOpacity
        style={[
          styles.container,
          styles.row,
          {borderColor: theme.colors.border},
          style && style,
        ]}
        onPress={goProductDetail}>
        <Image
          source={
            images && images[0]
              ? {uri: images[0].shop_single, cache: 'reload'}
              : require('src/assets/images/pDefault.png')
          }
          resizeMode="stretch"
          style={styles.image}
        />
        <View style={[styles.right, styles.col]}>
          <View style={[styles.info, styles.row]}>
            <Text colorSecondary style={[styles.textName, styles.col]}>
              {unescape(name)}
            </Text>
            <Price price_format={price_format} type={type} />
          </View>
          {type !== SIMPLE ||
          (type === SIMPLE &&
            stockStatusList.includes(stock_status) &&
            purchasable &&
            configs.get('toggleCheckout')) ? (
            <Button
              title={titleButton}
              buttonStyle={styles.button}
              titleStyle={styles.titleButton}
              size={'small'}
              onPress={type === SIMPLE ? getAddToCart : goProductDetail}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  container: {
    padding: padding.large,
    borderBottomWidth: 1,
  },
  image: {
    width: 79,
    height: 94,
  },
  right: {
    paddingLeft: padding.large,
    alignItems: 'flex-start',
  },
  info: {
    marginBottom: margin.small,
  },
  textName: {
    marginRight: margin.large,
  },
  button: {
    paddingHorizontal: padding.big,
    backgroundColor: black,
    borderColor: black,
  },
  titleButton: {
    color: white,
    fontSize: sizes.h6,
  },
});
const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  handleAddToCart: data => dispatch(addToCart(data)),
});

export default compose(
  withTheme,
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ItemWishlist);
