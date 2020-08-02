import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Dimensions, FlatList} from 'react-native';
import {ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import ButtonGroup from 'src/containers/ButtonGroup';
import Empty from 'src/containers/Empty';
import Container from 'src/containers/Container';
import VendorHeaderDetail from 'src/containers/VendorHeaderDetail';

import ProductStore from './store/ProductStore';
import AboutStore from './store/AboutStore';
import PolicesStore from './store/PolicesStore';
import ReviewsStore from './store/ReviewsStore';
import FollowStore from './store/FollowStore';
import ContactStore from './store/ContactStore';
import TimeStore from './store/TimeStore';

import {detailVendorSelector} from 'src/modules/vendor/selectors';

import {padding, margin} from 'src/components/config/spacing';
import {isLoginSelector} from 'src/modules/auth/selectors';

const {width} = Dimensions.get('window');

class StoreDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitCurrent: 0,
    };
  }
  renderContent = ({item, index}) => {
    const {navigation, vendorDetail, ...props} = this.props;
    const {visitCurrent} = this.state;
    const ContentComponent = item.Component;

    // const store = navigation.getParam('store', {});
    return (
      <View style={styles.tabContent}>
        {index === visitCurrent && ContentComponent ? (
          <ContentComponent {...props} navigation={navigation} store={vendorDetail.toJS()} />
        ) : null}
      </View>
    );
  };

  goTab = index => {
    if (this.flatListPayment) {
      this.flatListPayment.scrollToIndex({animated: false, index});
      this.setState({
        visitCurrent: index,
      });
    }
  };

  render() {
    const {
      navigation,
      screenProps: {t},
      vendorDetail,
    } = this.props;
    const {visitCurrent} = this.state;

    if (vendorDetail.size < 1) {
      return (
        <ThemedView isFullView>
          <Header
            leftComponent={<IconHeader />}
            rightComponent={<TextHeader title="Store Detail" />}
          />
          <Empty
            icon="box"
            title={t('empty:text_title_product')}
            subTitle={t('empty:text_subtitle_product')}
            titleButton={t('common:text_go_shopping')}
          />
        </ThemedView>
      )
    }

    const dataTab = [
      {
        name: t('catalog:text_store_detail_product'),
        showNumber: false,
        Component: ProductStore,
      },
      {
        name: t('catalog:text_store_detail_review'),
        // showNumber: true,
        // number: store && store.rating && store.rating.count ? store.rating.count: 0,
        Component: ReviewsStore,
      },
      {
        name: t('catalog:text_store_detail_about'),
        showNumber: false,
        Component: AboutStore,
      },
      // {
      //   name: 'Polices',
      //   showNumber: false,
      //   Component: PolicesStore,
      // },
      // {
      //   name: 'Followers',
      //   showNumber: true,
      //   number: store.follows,
      //   Component: FollowStore,
      // },
      {
        name: t('catalog:text_store_detail_time'),
        Component: TimeStore,
      },
      {
        name: t('catalog:text_store_detail_contact'),
        Component: ContactStore,
      },
    ];

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={vendorDetail.get('store_name')} />}
        />
        <Container>
          <VendorHeaderDetail store={vendorDetail.toJS()} />
        </Container>
        <ButtonGroup
          lists={dataTab}
          visit={visitCurrent}
          clickButton={this.goTab}
          containerStyle={styles.headerTab}
          contentContainerStyle={styles.tabScroll}
          pad={36}
        />
        <FlatList
          data={dataTab}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          ref={ref => {
            this.flatListPayment = ref;
          }}
          keyExtractor={item => item.name}
          renderItem={this.renderContent}
        />
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    width: width,
  },
  headerTab: {
    paddingLeft: margin.large,
    marginVertical: margin.big,
  },
  tabScroll: {
    paddingRight: padding.large,
  },
});

const mapStateToProps = state => {
  return {
    vendorDetail: detailVendorSelector(state),
    isLogin: isLoginSelector(state),
  };
};
export default connect(mapStateToProps)(StoreDetail);
