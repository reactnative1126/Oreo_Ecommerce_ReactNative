import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import Container from 'src/containers/Container';
import ProductItem from 'src/containers/ProductItem';

import { columnProductSelector, currencySelector, defaultCurrencySelector, daysBeforeNewProductSelector  } from 'src/modules/common/selectors';
import { prepareProductItem } from 'src/utils/product';

import { padding, margin } from 'src/components/config/spacing';

const { width } = Dimensions.get('window');

const widthImage = (col = 1) => {
  const widthFlatList = width - 2 * padding.large;
  const widthDistantImage = (col - 1) * padding.small;
  return (widthFlatList - widthDistantImage) / col;
};
const heightImage = (w = 168) => {
  return (w * 200) / 168;
};

class ProductView extends React.Component {
  renderFooter = () => {
    if (!this.props.loadingMore) return <View style={styles.viewFooter} />;

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  render() {
    const { data, column, refreshing, handleLoadMore, handleRefresh, currency, defaultCurrency, days  } = this.props;
    const wImage = widthImage(column);
    const hImage = heightImage(wImage);
    const dataPrepare = data.map(item => prepareProductItem(item, currency, defaultCurrency, days ));

    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        key={column}
        numColumns={column}
        columnWrapperStyle={column > 1 ? styles.viewCol : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => `${item.id}`}
        data={dataPrepare.toJS()}
        renderItem={({ item }) => (
          <Container disable={column > 1 ? 'all' : 'none'}>
            <ProductItem item={item} width={wImage} height={hImage} />
          </Container>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={this.renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  viewCol: {
    justifyContent: 'space-between',
    paddingHorizontal: padding.large,
  },
  separator: {
    height: 36,
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
    column: columnProductSelector(state),
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
    days: daysBeforeNewProductSelector(state),
  };
};
ProductView.defaultProps = {
  data: fromJS([]),
  loadingMore: false,
  refreshing: false,
  handleLoadMore: () => {},
  handleRefresh: () => {},
};

export default connect(mapStateToProps)(ProductView);
