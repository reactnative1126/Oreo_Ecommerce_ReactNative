import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import {connect} from 'react-redux';

import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import Container from 'src/containers/Container';
import Refine from 'src/screens/shop/containers/Refine';
import ItemProduct from './ItemProduct';
import ModalFilter from './ModalFilter';

import {green} from 'src/components/config/colors';
import {margin} from 'src/components/config/spacing';
import {getProductsByVendorId} from 'src/modules/vendor/service';
import {prepareProductItem} from 'src/utils/product';
import {
  currencySelector,
  daysBeforeNewProductSelector,
  defaultCurrencySelector,
} from 'src/modules/common/selectors';

class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      loadingMore: false,
      data: fromJS([]),
      page: 1,
      sortBy: {},
      isModalRefine: false,
    };
  }
  componentDidMount() {
    this.fetchProducts();
  }
  getData = (vendor_id, page) => {
    const {lang} = this.props;
    const {sortBy} = this.state;

    const objectSortBy = sortBy && sortBy.query ? sortBy.query : {};

    const query = Map({
      status: 'publish',
      lang: lang,
      per_page: 4,
      page: page,
      ...objectSortBy,
    });
    return getProductsByVendorId(vendor_id, query.toJS());
  };

  fetchProducts = async (page = this.state.page) => {
    try {
      const {store} = this.props;
      const dataGet = await this.getData(store.id, page);

      if (dataGet.length <= 4 && dataGet.length > 0) {
        this.setState(preState => {
          return {
            loading: false,
            refreshing: false,
            loadingMore: dataGet.length === 4,
            data: page === 1 ? fromJS(dataGet) : preState.data.concat(fromJS(dataGet)),
          };
        });
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
          refreshing: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };
  handleLoadMore = () => {
    const {loadingMore} = this.state;

    if (loadingMore) {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        () => {
          this.fetchProducts();
        },
      );
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchProducts();
      },
    );
  };
  renderFooter = () => {
    if (!this.state.loadingMore) return <View style={styles.viewFooter} />;

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };
  sortData = dataSortBy => {
    this.setState(
      {
        sortBy: dataSortBy,
        loading: true,
        refreshing: false,
        loadingMore: false,
        data: fromJS([]),
        page: 1,
      },
      this.fetchProducts,
    );
  };

  render() {
    const {loading, refreshing, data, sortBy, isModalRefine} = this.state;
    const {currency, defaultCurrency, days} = this.props;
    const dataPrepare = data.map(item =>
      prepareProductItem(item, currency, defaultCurrency, days),
    );

    return (
      <View style={styles.container}>
        <Container style={styles.refine}>
          <Refine onPress={() => this.setState({isModalRefine: true})} />
        </Container>
        {loading ? <View><ActivityIndicator /></View> : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => `${item.id}`}
            data={dataPrepare.toJS()}
            renderItem={({item}) => (
              <ItemProduct item={item} />
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
          />
        )}
        <ModalFilter
          visible={isModalRefine}
          select={sortBy}
          setModalVisible={value => this.setState({isModalRefine: value})}
          handleSort={dataSortBy => this.sortData(dataSortBy)}
        />
        {/*<Avatar*/}
        {/*  icon={{*/}
        {/*    name: 'message-square',*/}
        {/*    size: 20,*/}
        {/*    color: white,*/}
        {/*  }}*/}
        {/*  size={60}*/}
        {/*  rounded*/}
        {/*  overlayContainerStyle={styles.overlayIconMessage}*/}
        {/*  containerStyle={styles.containerIconMessage}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refine: {
    marginBottom: margin.large,
  },
  overlayIconMessage: {
    backgroundColor: green,
  },
  containerIconMessage: {
    position: 'absolute',
    right: margin.big,
    bottom: margin.big,
  },
  viewFooter: {
    marginBottom: 26,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
    days: daysBeforeNewProductSelector(state),
  };
}
export default connect(mapStateToProps)(ProductStore);
