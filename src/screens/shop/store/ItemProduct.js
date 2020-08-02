import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {withNavigation} from 'react-navigation';
import unescape from 'lodash/unescape';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Image, ThemeConsumer} from 'src/components';
import WishListIcon from 'src/containers/WishListIcon';
import Price from 'src/containers/Price';

import Rating from 'src/containers/Rating';

import {margin, padding} from 'src/components/config/spacing';

import {mainStack} from 'src/config/navigator';
import {configsSelector} from 'src/modules/common/selectors';

const ItemProduct = React.memo( props => {
  const {item, navigation, configs} = props;
  const {t} = useTranslation();
  if (!item) {
    return null;
  }
  const {
    name,
    images,
    price_format,
    type,
    id,
    in_stock,
    stock_quantity,
    average_rating,
    rating_count,
  } = item;

  const colorStock = !in_stock ? 'error' : 'success';
  const textStock = !in_stock
    ? 'catalog:text_stock_out'
    : stock_quantity
    ? 'catalog:text_in_stock'
    : 'catalog:text_stock';

  return (
    <ThemeConsumer>
      {({theme}) => (
        <TouchableOpacity
          style={[styles.container, {borderColor: theme.colors.border}]}
          onPress={() =>
            navigation.push(mainStack.product, {
              id,
            })
          }>
          <Image
            source={
              images && images.length
                ? {uri: images[0].src, cache: 'reload'}
                : require('src/assets/images/pDefault.png')
            }
            style={styles.image}
          />
          <View style={styles.content}>
            <View style={styles.viewName}>
              <Text h5 colorSecondary medium style={styles.name} numberOfLines={2}>
                {unescape(name)}
              </Text>
              <View style={styles.viewWishList}>
                <WishListIcon
                  product_id={id}
                  size={15}
                  color={theme.colors.primary}
                  colorSelect={theme.colors.primary}
                  containerStyle={styles.iconWishlist}
                />
              </View>
            </View>
            <Price
              price_format={price_format}
              type={type}
              style={styles.price}
            />
            <View style={styles.viewFooter}>
              {configs.get('toggleReviewProduct') ? <View style={styles.viewRating}>
                <Rating
                  startingValue={parseFloat(average_rating)}
                  readonly
                  containerStyle={styles.rating}
                />
                <Text medium style={styles.countRating}>
                  ({rating_count})
                </Text>
              </View> : <View style={styles.viewRating}/>}
              <Text
                h6
                style={[styles.stockStatus, {color: theme.colors[colorStock]}]}>
                {t(textStock, {count: stock_quantity})}
              </Text>

            </View>
          </View>
        </TouchableOpacity>
      )}
    </ThemeConsumer>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: padding.large,
    paddingVertical: padding.large + 3,
    borderBottomWidth: 1,
  },
  image: {
    width: 78,
    height: 93,
  },
  content: {
    flex: 1,
    marginLeft: margin.large + 4,
  },
  viewName: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    marginRight: margin.base,
  },
  viewWishList: {
    zIndex: 9999,
  },
  iconWishlist: {
    marginTop: 3,
  },
  price: {
    marginBottom: margin.big - 6,
  },
  viewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewRating: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: margin.small,
  },
  rating: {
    marginRight: margin.small - 2,
  },
  countRating: {
    fontSize: 10,
    lineHeight: 15,
  },
  stockStatus: {
    marginLeft: margin.small,
  },
});

ItemProduct.defaultProps = {
  item: {},
};

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
  };
};

export default compose(
  withNavigation,
  connect(mapStateToProps),
)(ItemProduct);
