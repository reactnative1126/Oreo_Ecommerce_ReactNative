import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import fetch from 'src/utils/fetch';
import debounce from 'lodash/debounce';

import { SearchBar, ThemedView } from 'src/components';
import SearchRecentItem from './containers/SearchRecentItem';
import SearchProductItem from './containers/SearchProductItem';

import { currencySelector, defaultCurrencySelector } from 'src/modules/common/selectors';
import { filterBySelector } from 'src/modules/product/selectors';
import { mainStack } from 'src/config/navigator';
import { filterByProduct, addKeyword } from 'src/modules/product/actions';
import { prepareProductItem } from 'src/utils/product';

import { getStatusBarHeight } from 'react-native-status-bar-height';

class SearchScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  updateSearch = value => {
    const { filterBy, dispatch } = this.props;
    const newFilter = filterBy.set('search', value);
    dispatch(filterByProduct(newFilter));
  };

  search = debounce(() => {
    const { filterBy } = this.props;
    const search = filterBy.get('search');

    if (search.length > 1) {
      this.setState({
        loading: true,
      });

      fetch
        .get(`wc/v3/products?search=${search}`)
        .then(data => {
          this.setState({
            data,
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            data: [],
            loading: false,
          });
        });
    }
  }, 200);

  searchSubmit = () => {
    const { filterBy, navigation, dispatch } = this.props;
    dispatch(addKeyword(filterBy.get('search')));
    navigation.navigate(mainStack.products, { name: filterBy.get('search'), filterBy });
  };

  handleRecentKeyword = search => {
    const { filterBy, navigation } = this.props;
    const newFilterBy = filterBy.set('search', search);
    navigation.navigate(mainStack.products, { name: search, filterBy: newFilterBy });
  };

  handleProductPage = product => {
    const { navigation, currency, defaultCurrency } = this.props;
    navigation.navigate(mainStack.product, {
      // no need get days in prepareProductItem
      product: prepareProductItem(fromJS(product), currency, defaultCurrency).toJS(),
    });
  };

  render() {
    const { loading } = this.state;
    const {
      filterBy,
      navigation,
      screenProps: { t },
    } = this.props;

    return (
      <ThemedView isFullView style={styles.container}>
        <SearchBar
          placeholder={t('catalog:text_placeholder_search')}
          cancelButtonTitle={t('common:text_cancel')}
          onChangeText={this.updateSearch}
          value={filterBy.get('search')}
          onChange={this.search}
          autoFocus
          showLoading={loading}
          returnKeyType="search"
          onSubmitEditing={this.searchSubmit}
          onCancel={() => navigation.goBack()}
        />
        <ScrollView>
          <SearchRecentItem handleRecentKeyword={this.handleRecentKeyword} />
          <SearchProductItem data={this.state.data} handleProductPage={this.handleProductPage} />
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
});

const mapStateToProps = state => {
  return {
    filterBy: filterBySelector(state),
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
  };
};

export default connect(mapStateToProps)(SearchScreen);
