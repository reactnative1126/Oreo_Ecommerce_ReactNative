import React from 'react';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';

import {StyleSheet} from 'react-native';
import {Text, ListItem} from 'src/components';
import Container from 'src/containers/Container';
import RadioIcon from './containers/RadioIcon';
import ViewRefine from './containers/ViewRefine';

import {mainStack} from 'src/config/navigator';

import {sortBySelector, attributeSelector} from 'src/modules/product/selectors';
import {sortByProduct, fetchProductAttributes, clearFilter, fetchProducts} from 'src/modules/product/actions';

import {margin} from 'src/components/config/spacing';

class RefineScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props, context) {
    super(props, context);
    const {
      screenProps: {t},
    } = props;

    this.state = {
      sortBy: fromJS([
        {
          key: 'popularity',
          title: t('catalog:text_sort_popular'),
          query: {orderby: 'popularity'},
        },
        {
          key: 'rating',
          title: t('catalog:text_sort_rating'),
          query: {orderby: 'rating'},
        },
        {
          key: 'date',
          title: t('catalog:text_latest'),
          query: {},
        },
        {
          key: 'price',
          title: t('catalog:text_sort_price_low'),
          query: {order: 'asc', orderby: 'price'},
        },
        {
          key: 'price-desc',
          title: t('catalog:text_sort_price_high'),
          query: {order: 'desc', orderby: 'price'},
        },
      ]),
      old: this.props.sortBy,
    };
  }

  componentDidMount() {
    const {fetchProductAttributes} = this.props;
    fetchProductAttributes();
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount Refine');
    // TOTO: clear filter by
  }

  /**
   * Render sort by item
   * @param item
   * @returns {*}
   */
  renderSortBy = item => {
    const {sortBy, sortByProduct} = this.props;
    const isSelect = sortBy.get('key') === item.get('key');

    return (
      <ListItem
        key={item.get('key')}
        title={item.get('title')}
        type="underline"
        small
        rightIcon={<RadioIcon isSelect={isSelect}/>}
        containerStyle={styles.item}
        onPress={() => sortByProduct(item)}
      />
    );
  };

  /**
   * Render attributes item
   * @param item
   * @returns {*}
   */
  renderAttribute = item => {
    const { navigation} = this.props;

    return (
      <ListItem
        key={item.get('id')}
        title={item.get('name')}
        type="underline"
        small
        chevron
        onPress={() =>
          navigation.navigate(mainStack.filter_attribute, {
            attribute: item,
          })
        }
      />
    );
  };

  showResult = () => {
    const {navigation, sortBy} = this.props;
    navigation.navigate(mainStack.products, {sortBy});
  };

  clearAll = () => {
    this.props.clearFilter();
  };

  goFilterPrice = () => {
    const {navigation, fetchProducts} = this.props;
    const data = navigation.getParam('data', [])
    fetchProducts(data);
    navigation.navigate(mainStack.filter_price)
  };

  render() {
    const {
      navigation,
      attribute,
      screenProps: {t},
    } = this.props;
    const {sortBy} = this.state;
    const category = navigation.getParam('category', {});

    return (
      <ViewRefine handleResult={this.showResult} clearAll={this.clearAll}>
        <Container>
          <Text h3 medium style={styles.textSort}>
            {t('catalog:text_sort')}
          </Text>

          {sortBy.map(item => this.renderSortBy(item))}

          <Text h3 medium style={styles.textFilter}>
            {t('catalog:text_filter')}
          </Text>

          {category ? (
            <ListItem
              title={t('catalog:text_category')}
              type="underline"
              small
              chevron
              onPress={() => navigation.navigate(mainStack.filter_category, {category})}
            />) : null}

          <ListItem
            title={t('catalog:text_price_range')}
            type="underline"
            small
            chevron
            onPress={this.goFilterPrice}
          />

          {attribute.get('data').map(item => this.renderAttribute(item))}
        </Container>
      </ViewRefine>
    );
  }
}

const styles = StyleSheet.create({
  textSort: {
    marginTop: margin.large,
  },
  textFilter: {
    marginTop: margin.big + margin.small,
  },
});

const mapDispatchToProps = {
  clearFilter,
  fetchProducts,
  sortByProduct,
  fetchProductAttributes
};

const mapStateToProps = state => {
  return {
    sortBy: sortBySelector(state),
    attribute: attributeSelector(state),
  };
};

RefineScreen.defaultProps = {
  data: [],
};
export default connect(mapStateToProps, mapDispatchToProps)(RefineScreen);
