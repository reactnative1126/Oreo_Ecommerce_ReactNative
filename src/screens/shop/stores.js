import React from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import VendorHeaderDetail from 'src/containers/VendorHeaderDetail';

import {getVendors} from 'src/modules/vendor/service';
import {fetchVendorDetailSuccess} from 'src/modules/vendor/actions';
import {margin} from 'src/components/config/spacing';
import {mainStack} from 'src/config/navigator';

class Stores extends React.Component {
  state = {
    data: [],
    page: 1,
    loading: true,
    loadingMore: false,
    refreshing: false,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      // const {language} = this.props;
      const {page} = this.state;
      const query = {
        page,
        per_page: 10,
        // lang: language
      };
      const data = await getVendors(query);
      if (data.length <= 10 && data.length > 0) {
        this.setState(prevState => ({
          data: page === 1 ? Array.from(data) : [...prevState.data, ...data],
          loading: false,
          loadingMore: data.length === 10,
          refreshing: false,
        }));
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        error,
        loading: false,
        loadingMore: false,
      });
    }
  };

  handleLoadMore = () => {
    const {loadingMore} = this.state;

    if (loadingMore) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        () => {
          this.fetchData();
        },
      );
    }
  };

  renderFooter = () => {
    if (!this.state.loadingMore) {
      return <View style={styles.footer} />;
    }

    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchData();
      },
    );
  };
  goStoreDetail = data => {
    const {saveVendor, navigation} = this.props;
    saveVendor(data);
    navigation.navigate(mainStack.store_detail);
  };

  render() {
    const {screenProps: {t}} = this.props;
    const {data, loading, refreshing} = this.state;
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_stores')} />}
        />
        {!loading ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <VendorHeaderDetail
                store={item}
                isClickDetail
                style={styles.item}
                onPress={() => this.goStoreDetail(item)}
              />
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={this.renderFooter()}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
          />
        ) : (
          <View style={styles.viewLoading}>
            <ActivityIndicator />
          </View>
        )}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: margin.large,
    marginBottom: margin.small,
  },
  viewLoading: {
    marginVertical: margin.large,
  },
  footer: {
    marginBottom: margin.large,
  },
  footerLoading: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
const mapDispatchToProps = {
  saveVendor: fetchVendorDetailSuccess,
};

export default connect(null, mapDispatchToProps)(Stores);
