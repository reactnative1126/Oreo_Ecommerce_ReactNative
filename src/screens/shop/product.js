import React, {Component} from 'react';

import {compose} from 'recompose';
import {fromJS, List, Map} from 'immutable';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import unescape from 'lodash/unescape';

import {showMessage} from 'react-native-flash-message';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {Text, ListItem, ThemedView} from 'src/components';
import Price from 'src/containers/Price';
import Container from 'src/containers/Container';
import Rating from 'src/containers/Rating';
import Empty from 'src/containers/Empty';
import VendorHeaderDetail from 'src/containers/VendorHeaderDetail';
import TextHtml from 'src/containers/TextHtml';

import ScrollProductDetail from './product/ScrollProductDetail';
import RelatedProducts from './containers/RelatedProducts';
import ProductVariable from './product/ProductVariable';
import ProductExternal from './product/ProductExternal';
import ProductGrouped from './product/ProductGrouped';
import CategoryName from './product/CategoryName';
import ProductImages from './product/ProductImages';
import ProductStock from './product/ProductStock';
import FooterProduct from './product/FooterProduct';

import {addToCart} from 'src/modules/cart/actions';
import {getVariations} from 'src/modules/product/service';
import {
  attributeSelector,
  dataRatingSelector,
} from 'src/modules/product/selectors';
import {
  defaultCurrencySelector,
  currencySelector,
  languageSelector,
  configsSelector,
} from 'src/modules/common/selectors';

import {prepareProductItem} from 'src/utils/product';
import {changeColor, changeSize} from 'src/utils/text-html';

import {getSingleData, defaultPropsData} from 'src/hoc/single-data';
import {withLoading} from 'src/hoc/loading';

import {mainStack, homeTabs} from 'src/config/navigator';
import {margin} from 'src/components/config/spacing';
import * as productType from 'src/config/product';

import {handleError} from 'src/utils/error';
import {fetchProductAttributes, fetchRating} from 'src/modules/product/actions';
import {fetchVendorDetail} from 'src/modules/vendor/actions';
import {detailVendorSelector} from 'src/modules/vendor/selectors';

const {height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.6;

class Product extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props, context) {
    super(props, context);

    const {navigation, data, currency, defaultCurrency} = props;
    const product = navigation.getParam('product', {});
    // no need get days in prepareProductItem
    const dataPrepare = prepareProductItem(
      fromJS(data),
      currency,
      defaultCurrency,
    );
    const dataProduct = product && product.id ? fromJS(product) : dataPrepare;
    this.state = {
      product: dataProduct,
      images: dataProduct.get('images'),
      loadingVariation: dataProduct.get('type') === productType.VARIABLE, // Loading state fetch product variations
      quantity: 1,
      variation: Map(),
      meta_data: List(),
      variations: List(),
      isAddToCart: false,
    };
  }

  componentDidMount() {
    const {dispatch, attribute, lang} = this.props;
    const {product} = this.state;

    const vendor_id = product.getIn(['store', 'id']);
    dispatch(fetchRating(product.get('id')));

    // Fetch attribute with product is variation
    if (
      product.get('type') === productType.VARIABLE &&
      !attribute.get('data').size
    ) {
      dispatch(fetchProductAttributes());
    }

    // Fetch variations
    if (product.get('type') === productType.VARIABLE) {

      this.abortController = new AbortController();

      // Get variations
      getVariations(product.get('id'), lang, {
        signal: this.abortController.signal,
      })
        .then(data => {
          this.setState({
            variations: fromJS(data),
            loadingVariation: false,
          });
        })
        .catch(error => {
          handleError(error);
          this.setState({
            loadingVariation: false,
          });
          handleError(error);
        });
    }

    if (vendor_id) {
      dispatch(fetchVendorDetail(vendor_id))
      // this.getStore(vendor_id)
    }
  }

  componentWillUnmount() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  addToCart = () => {
    const {product, quantity, variation, meta_data} = this.state;
    const {dispatch} = this.props;
    let check = true;

    // Check select variations
    if (product.get('type') === productType.VARIABLE) {
      const attributeProduct = product
        .get('attributes')
        .filter(attr => attr.get('variation'));
      if (!meta_data.size || attributeProduct.size !== meta_data.size) {
        check = false;
        showMessage({
          message: 'Please select variations',
          type: 'danger',
        });
      }
    }
    if (check) {
      dispatch(
        addToCart(
          {
            product_id: product.get('id'),
            quantity,
            variation,
            product,
            meta_data,
          },
          () => this.setState({isAddToCart: true}),
        ),
      );
    }
  };

  onChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  images = () => {
    const {product, variation, images} = this.state;
    if (
      product.get('type') === productType.VARIABLE &&
      variation &&
      variation.get('image')
    ) {
      let list = [];
      const image = variation.get('image');
      if (image) {
        list.push(image.toJS());
      }
      return fromJS(list);
    }
    return images;
  };

  showPrice = () => {
    const {currency, defaultCurrency} = this.props;
    const {product, variation} = this.state;

    let price_format = product.get('price_format').toJS();
    let type = product.get('type');
    let p = product;
    if (product.get('type') === productType.VARIABLE && variation.get('id')) {
      // no need get days in prepareProductItem
      const value = prepareProductItem(variation, currency, defaultCurrency);
      price_format = value.get('price_format').toJS();
      type = value.get('type')
      p = variation;
    }
    return (
      <View style={styles.viewPrice}>
        <Price
          price_format={price_format}
          type={type}
          h4
          isPercentSale
          // style={styles.viewPrice}
        />
        <ProductStock
          product={p}
          // style={p.get('type') !== productType.SIMPLE && styles.viewStock}
        />
      </View>
    )
  };

  showInfoType = () => {
    const {attribute} = this.props;
    const {product, meta_data, variations, loadingVariation} = this.state;
    if (product.get('type') === productType.EXTERNAL) {
      return <ProductExternal product={product} />;
    }
    if (product.get('type') === productType.GROUPED) {
      return <ProductGrouped product={product} />;
    }
    if (product.get('type') === productType.VARIABLE) {
      return (
        <ProductVariable
          loading={attribute.get('loading') || loadingVariation}
          meta_data={meta_data}
          productVariations={variations}
          productAttributes={product.get('attributes')}
          onChange={this.onChange}
          attribute={attribute.get('data')}
        />
      );
    }
    return null;
  };

  render() {
    const {
      screenProps: {t, theme},
      dataRating: {rating},
      navigation,
      configs,
      vendorDetail,
    } = this.props;

    const {product, isAddToCart, variation} = this.state;

    if (!product.get('id')) {
      return (
        <ThemedView isFullView>
          <Empty
            title={t('empty:text_title_product_detail')}
            subTitle={t('empty:text_subtitle_product_detail')}
            clickButton={() => navigation.navigate(homeTabs.shop)}
          />
        </ThemedView>
      );
    }
    const images = this.images();
    const related_ids = product.get('related_ids').size
      ? product.get('related_ids').toJS()
      : [];

    const firstImage = images.first();
    const image =
      firstImage && firstImage.get('src') ? firstImage.get('src') : '';
    const stock_status = ['instock', 'onbackorder'];

    const valueCheck = variation && variation.size > 0 ? variation : product;

    return (
      <ScrollProductDetail
        headerTitle={unescape(product.get('name'))}
        imageElement={
          <ProductImages
            images={images}
            product_id={product.get('id')}
            url={product.get('permalink')}
            name_product={product.get('name')}
            height={HEADER_MAX_HEIGHT}
          />
        }
        footerElement={
          configs.get('toggleCheckout') &&
          valueCheck.get('purchasable') &&
          stock_status.includes(valueCheck.get('stock_status')) && (
            <FooterProduct
              isAddToCart={isAddToCart}
              onPressAddCart={this.addToCart}
              onPressViewCart={() => navigation.navigate(homeTabs.cart)}
            />
          )
        }
        heightViewImage={HEADER_MAX_HEIGHT}>
        <Container style={styles.container}>
          <View style={styles.viewCategoryRating}>
            <CategoryName product={product} style={styles.textCategory} />
            {configs.get('toggleReviewProduct') ?
              <TouchableOpacity
                style={styles.viewRating}
                onPress={() =>
                  this.props.navigation.navigate(mainStack.product_review, {
                    product_id: product.get('id'),
                    image: image,
                    name: product.get('name'),
                  })
                }>
                <Rating size={12} startingValue={rating} readonly />
                <Text style={styles.textRating}>({product.get('rating_count')})</Text>
              </TouchableOpacity> : null}
          </View>
          <Text h2 medium style={styles.textName}>
            {unescape(product.get('name'))}
          </Text>
          {this.showPrice()}
          {product.get('sku') ? <Text h6 medium style={styles.textName}>
            sku: {product.get('sku')}
          </Text> : null}
          {configs.get('toggleShortDescriptionProduct') && product.get('short_description') ? (
            <View style={{marginBottom: 16}}>
              <TextHtml
                value={product.get('short_description')}
                style={merge(changeSize('h6'), changeColor(theme.Text.third.color))}
              />
            </View>
          ) : null}
          {this.showInfoType()}
          {/*{this.showStock()}*/}
          <ListItem
            title={t('catalog:text_description')}
            onPress={() =>
              this.props.navigation.navigate(mainStack.product_description, {
                description: product.get('description'),
              })
            }
            small
            chevron
            type="underline"
          />

          {product.get('attributes') && product.get('attributes').size ? (
            <ListItem
              title={t('catalog:text_information')}
              onPress={() =>
                this.props.navigation.navigate(mainStack.product_attribute, {
                  attributes: product.get('attributes'),
                })
              }
              small
              chevron
              type="underline"
            />
          ): null}

          {configs.get('toggleReviewProduct') ? <ListItem
            title={t('catalog:text_reviews')}
            onPress={() =>
              this.props.navigation.navigate(mainStack.product_review, {
                product_id: product.get('id'),
                image: image,
                name: product.get('name'),
              })
            }
            small
            chevron
            type="underline"
          /> : null}
          {vendorDetail && vendorDetail.size > 0 ? (
            <VendorHeaderDetail
              store={vendorDetail.toJS()}
              style={{
                marginTop: 25,
              }}
              onPress={() => navigation.navigate(mainStack.store_detail)}
            />
          ) : null}
        </Container>
        {related_ids.length ? (
          <View style={styles.viewRelated}>
            <RelatedProducts data={related_ids.join(',')} />
          </View>
        ) : null}
        {/*{product.get('purchasable') && (*/}
        {/*<Container style={styles.viewFooter}>*/}
        {/*<Button title={t('common:text_add_cart')} onPress={this.addToCart} />*/}
        {/*</Container>*/}
        {/*)}*/}
      </ScrollProductDetail>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: margin.large,
  },
  viewCategoryRating: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: margin.small / 2,
  },
  textCategory: {
    flex: 1,
    marginRight: margin.base,
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRating: {
    fontSize: 10,
    lineHeight: 15,
    marginLeft: margin.small / 2,
  },
  textName: {
    marginBottom: margin.small,
  },
  viewPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margin.large,
  },
  textDescription: {
    marginBottom: margin.large,
  },
  viewStock: {
    marginTop: margin.large,
    marginBottom: margin.small + margin.big,
  },
  viewRelated: {
    marginBottom: margin.big,
  },
  viewFooter: {
    marginVertical: margin.big,
  },
});

const mapStateToProps = state => {
  return {
    attribute: attributeSelector(state),
    dataRating: dataRatingSelector(state),
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
    lang: languageSelector(state),
    configs: configsSelector(state),
    vendorDetail: detailVendorSelector(state),
  };
};

const withReduce = connect(mapStateToProps);

export default compose(
  withReduce,
  defaultPropsData,
  getSingleData,
  withLoading,
)(Product);
