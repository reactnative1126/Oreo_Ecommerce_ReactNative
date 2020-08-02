import React from 'react';
import {compose} from 'redux';
import {fromJS, List, Map} from 'immutable';
import {connect} from 'react-redux';
import unescape from 'lodash/unescape';
import {withNavigation} from 'react-navigation';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, ActivityIndicator, Linking} from 'react-native';
import {ThemedView, Button, Text, ThemeConsumer} from 'src/components';
import Price from 'src/containers/Price';
import Quantity from 'src/containers/Quantity';

import {addListToCart} from 'src/modules/cart/actions';
import {getProducts} from 'src/modules/product/service';
import {
  configsSelector,
  currencySelector,
  defaultCurrencySelector,
} from 'src/modules/common/selectors';

import {handleError} from 'src/utils/error';

import * as productTypes from 'src/config/product';
import {prepareProductItem} from 'src/utils/product';
import {mainStack} from 'src/config/navigator';
import {padding, borderRadius} from 'src/components/config/spacing';
import {checkQuantity} from 'src/utils/product';
import {showMessage} from 'react-native-flash-message';

class ProductGrouped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: fromJS([]),
      loading: true,
      quantities: fromJS({}),
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const {product, currency, defaultCurrency} = this.props;
      let {data, quantities} = this.state;
      if (!product || !product.get('id')) {
        this.setState({
          loading: false,
        });
      }
      const query = {
        include: product.get('grouped_products').toJS(),
        status: 'publish',
      };
      const dataCategory = await getProducts(query);
      const dataPrepare = fromJS(dataCategory);

      dataPrepare.map(p => {
        // no need get days in prepareProductItem
        const prepareData = prepareProductItem(p, currency, defaultCurrency);
        data = data.push(prepareData);
        if (
          p.get('type') === productTypes.SIMPLE &&
          p.get('purchasable') &&
          p.get('stock_status') !== 'outofstock'
        ) {
          quantities = quantities.set(p.get('id'), 0);
        }
      });
      this.setState({
        data,
        loading: false,
        quantities,
      });
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };
  goProductDetail = product => {
    this.props.navigation.push(mainStack.product, {
      product: product.toJS(),
    });
  };
  addToCart = () => {
    const {t, dispatch} = this.props;
    const {quantities, data} = this.state;
    if (!quantities.find(q => q > 0)) {
      handleError({
        message: t('catalog:text_choose_cart'),
      });
    } else {
      let list = [];
      quantities.mapKeys(key => {
        const product = data.find(p => p.get('id') === key);
        if (product && product.get('id') && quantities.get(key) > 0) {
          list = list.concat({
            product_id: key,
            quantity: quantities.get(key),
            variation: Map(),
            product,
            meta_data: List(),
          });
        }
      });
      dispatch(addListToCart(list));
    }
  };
  changeQuantity = (key, value) => {
    if (value >= 0) {
      const {data} = this.state;
      const getProduct = data.find(p => p.get('id') == key);
      const check = checkQuantity(getProduct.toJS(), value)
      if (check) {
        let {quantities} = this.state;
        quantities = quantities.update(key, v => {
          return value;
        });
        this.setState({
          quantities,
        });
      } else {
        showMessage({
          message: 'Can\'t change quantity',
          description: 'The quantity out of stock on store.',
          type: 'danger',
        });
      }
    }
  };
  showButtonAdd = (item, theme) => {
    const {t} = this.props;
    const {quantities} = this.state;
    const {ProductGrouped: colors} = theme;
    if (item.get('stock_status') === 'outofstock') {
      return (
        <Button
          title={t('common:text_read_more')}
          size={'small'}
          onPress={() => this.goProductDetail(item)}
        />
      );
    }
    if (item.get('type') === productTypes.EXTERNAL) {
      return (
        <Button
          title={item.get('button_text')}
          size={'small'}
          onPress={() => Linking.openURL(item.get('external_url'))}
        />
      );
    }
    if (
      item.get('type') === productTypes.VARIABLE ||
      item.get('type') === productTypes.GROUPED
    ) {
      return (
        <Button
          title={t('common:text_choose_item')}
          size={'small'}
          onPress={() => this.goProductDetail(item)}
        />
      );
    }
    return (
      <Quantity
        value={quantities.get(item.get('id'))}
        onChange={value => this.changeQuantity(item.get('id'), value)}
        style={{backgroundColor: colors.quantityColor}}
      />
    );
  };
  render() {
    const {t, configs} = this.props;
    const {data, loading, quantities} = this.state;
    if (loading) {
      return <ActivityIndicator />;
    }
    if (data.size < 1) {
      return null;
    }
    return (
      <View>
        <ThemeConsumer>
          {({theme}) => (
            <ThemedView colorSecondary style={styles.container}>
              {data.map((p, index) => (
                <View
                  key={p.get('id')}
                  style={[
                    styles.item,
                    {
                      borderColor: theme.colors.border,
                      borderBottomWidth: index < data.size - 1 ? 1 : 0,
                    },
                  ]}>
                  <View style={styles.viewLeft}>
                    {this.showButtonAdd(p, theme)}
                  </View>
                  <Text
                    style={styles.viewCenter}
                    colorSecondary
                    onPress={() => this.goProductDetail(p)}>
                    {unescape(p.get('name'))}
                  </Text>
                  <View style={styles.viewRight}>
                    <Price
                      price_format={p.get('price_format').toJS()}
                      style={styles.price}
                    />
                  </View>
                </View>
              ))}
            </ThemedView>
          )}
        </ThemeConsumer>
        {configs.get('toggleCheckout') && quantities.size > 0 && (
          <Button
            title={t('common:text_add_cart')}
            containerStyle={{marginTop: 26}}
            onPress={() => this.addToCart()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.large,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: padding.large,
    paddingRight: 0,
  },
  viewLeft: {
    width: 86,
  },
  viewCenter: {
    flex: 1,
    paddingHorizontal: padding.large,
  },
  button: {
    paddingVertical: padding.small - 2,
  },
  viewRight: {
    width: 60,
  },
  price: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
  };
};

export default compose(
  withNavigation,
  withTranslation(),
  connect(mapStateToProps),
)(ProductGrouped);
