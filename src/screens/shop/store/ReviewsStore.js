import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import HeaderReview from 'src/containers/Reviews/HeaderReview';
import Button from 'src/containers/Button';
import ItemReview from './ItemReview';

import {setLoadingReview} from 'src/modules/vendor/actions';
import {getReviewByVendorId} from 'src/modules/vendor/service';
import {isLoadingReviewSelector} from 'src/modules/vendor/selectors';

import {margin, padding} from 'src/components/config/spacing';
import {mainStack} from 'src/config/navigator';
import {getSiteConfig} from "../../../modules/common/selectors";

const REVIEW_PER_PAGE = 10;

class ReviewsStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      loadingMore: false,
      data: [],
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchReviews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.loadingReview && this.props.loadingReview) {
      this.setState(
        {
          loading: true,
          refreshing: false,
          loadingMore: false,
          data: [],
          page: 1,
        },
        () => {
          this.fetchReviews();
          this.props.dispatch(setLoadingReview(false));
        },
      );
    }
  }

  fetchReviews = async (page = this.state.page) => {
    try {
      const {store} = this.props;
      const query = {
        per_page: REVIEW_PER_PAGE,
        page: page,
      };
      const data = await getReviewByVendorId(store.id, query);
      if (data.length <= REVIEW_PER_PAGE && data.length > 0) {
        this.setState(prevState => ({
          data: page === 1 ? Array.from(data) : [...prevState.data, ...data],
          loading: false,
          loadingMore: data.length === REVIEW_PER_PAGE,
          refreshing: false,
        }));
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        loadingMore: false,
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
          this.fetchReviews();
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
        this.fetchReviews();
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

  render() {
    const {store, navigation, isLogin, screenProps: {t}, siteConfig} = this.props;
    const {loading, data, refreshing} = this.state;
    if (!store) {
      return null;
    }
    const {rating} = store;
    const {rating: aveRating, count} = rating;
    const numRating = parseFloat(aveRating) ? parseFloat(aveRating) : 0;
    const valueRating = numRating.toFixed(1);

    return (
      <View style={styles.container}>
        <HeaderReview
          rating={valueRating}
          count={count}
          style={styles.headerView}
        />
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => `${item.id}`}
              data={data}
              renderItem={({item, index}) => <ItemReview tz={siteConfig.get('timezone_string')} data={item} style={index === 0 && {borderTopWidth: 1}}/>}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={this.renderFooter}
              refreshing={refreshing}
              onRefresh={this.handleRefresh}
            />
          )}
        </View>
        {isLogin && (
          <View style={styles.viewButton}>
            <Button
              title={t('common:text_product_review_form')}
              type="outline"
              size="small"
              buttonStyle={styles.button}
              onPress={() => navigation.navigate(mainStack.store_review)}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    marginBottom: margin.big + 4,
  },
  content: {
    flex: 1,
  },
  viewButton: {
    marginVertical: margin.big,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: padding.big - 5,
  },
});

const mapStateToProps = state => {
  return {
    loadingReview: isLoadingReviewSelector(state),
    siteConfig: getSiteConfig(state),
  };
};

export default connect(mapStateToProps)(ReviewsStore);
