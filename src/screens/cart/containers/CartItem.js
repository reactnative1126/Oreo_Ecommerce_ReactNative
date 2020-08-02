import React from 'react';

import {fromJS} from 'immutable';
import unescape from 'lodash/unescape';
import {StyleSheet, View} from 'react-native';
import {withTheme, Image, Text} from 'src/components';
import {Row, Col} from 'src/containers/Gird';
import Quantity from 'src/containers/Quantity';

import {grey4} from 'src/components/config/colors';
import {padding, margin} from 'src/components/config/spacing';
import {sizes, lineHeights} from 'src/components/config/fonts';

import currencyFormatter from 'src/utils/currency-formatter';

class CartItem extends React.Component {
  onChange = quantity => {
    const {changeQuantity, item} = this.props;
    changeQuantity(item, quantity);
  };

  renderVariation = (item, index) => {
    return (
      <Text key={index} style={styles.textAttribute}>
        {item.name} : {item.option}
      </Text>
    );
  };

  renderImage = (product, variation) => {
    let source =
      product.images && product.images.length
        ? {uri: product.images[0].woocommerce_single}
        : require('src/assets/images/pDefault.png');

    if (
      product.type === 'variable' &&
      variation.image &&
      variation.image.woocommerce_single
    ) {
      source = {uri: variation.image.woocommerce_single};
    }

    return <Image source={source} style={styles.image} />;
  };

  getPrice = () => {
    const {defaultCurrency, currency} = this.props;

    const item = fromJS(this.props.item);

    const product = item.get('product');
    const variation = item.get('variation');

    const source = product.get('type') === 'variable' ? variation : product;
    const regular_price =
      currency === defaultCurrency
        ? source.get('regular_price')
        : source.getIn(['multi-currency-prices', currency, 'regular_price']);
    const sale_price =
      currency === defaultCurrency
        ? source.get('sale_price')
        : source.getIn(['multi-currency-prices', currency, 'sale_price']);

    const price = sale_price ? sale_price : regular_price;

    return currencyFormatter(price, currency);
  };

  render() {
    const {theme, item, goToProduct, style} = this.props;
    const {product, quantity, meta_data, variation} = item;
    if (!product) {
      return null;
    }
    return (
      <Row
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.bgColor,
            borderColor: theme.colors.border,
          },
          style && style,
        ]}>
        {this.renderImage(product, variation)}
        <Col style={styles.content}>
          <View>
            <Text
              medium
              onPress={() => goToProduct(product)}
              style={styles.title}>
              {unescape(product.name)}
            </Text>
            <Row style={styles.viewAttribute}>
              {meta_data.map((item, index) => this.renderVariation(item, index))}
            </Row>
          </View>
          {!product.sold_individually && (
            <Quantity value={quantity} onChange={this.onChange} />
          )}
        </Col>
        <Text medium>{this.getPrice()}</Text>
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0,
    padding: padding.large,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    paddingLeft: padding.big,
    paddingRight: padding.big,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: margin.small - 1,
  },
  viewAttribute: {
    marginBottom: margin.small,
    marginLeft: 0,
    marginRight: 0,
    flexWrap: 'wrap',
  },
  textAttribute: {
    fontSize: sizes.h6 - 2,
    lineHeight: lineHeights.h6 - 2,
    color: grey4,
    marginRight: margin.small,
  },
});

export default withTheme(CartItem);
