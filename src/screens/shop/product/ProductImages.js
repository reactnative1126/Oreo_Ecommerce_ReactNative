import React, {Component} from 'react';

import isEqual from 'lodash/isEqual';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Share,
  Platform,
} from 'react-native';
import {Image, Icon} from 'src/components';
import ImageViewer from 'react-native-image-zoom-viewer';
import Pagination from 'src/containers/Pagination';
import WishListIcon from 'src/containers/WishListIcon';
import Container from 'src/containers/Container';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {black, white} from 'src/components/config/colors';
import {padding, margin} from 'src/components/config/spacing';

const {width} = Dimensions.get('window');

class ProductImages extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      indexCurrency: 0,
    };
    this.flatListRef = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images && this.props.images && !isEqual(prevProps.images.toJS(), this.props.images.toJS())) {
      this.ontop();
    }
  }

  ontop = () => {
    if (this.flatListRef) {
      this.flatListRef.scrollToOffset({animated: true, offset: 0});
    }
  };
  shareProduct = () => {
    const {url, name_product} = this.props;
    if (url) {
      let message =
        Platform.OS === 'android' ? `${name_product}. ${url}` : name_product;

      Share.share(
        {
          message: message,
          url: url,
          title: 'Share',
        },
        {
          // // Android only:
          dialogTitle: 'Oreo product',
          // // iOS only:
          // excludedActivityTypes: [
          //   'com.apple.UIKit.activity.PostToTwitter'
          // ]
        },
      );
    }
  };

  renderItem = ({item}) => {
    const {height} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.viewImage}
        onPress={() => this.setState({visible: true})}>
        <Image
          source={{uri: item.src, cache: 'reload'}}
          resizeMode="cover"
          style={{height: height, width: width}}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
    );
  };
  onViewableItemsChanged = ({viewableItems}) => {
    this.setState({
      indexCurrency: viewableItems[0] ? viewableItems[0].index : 0,
    });
  };
  getItemLayout = (data, index) => {
    return {length: width, offset: width * index, index};
  };

  render() {
    const {images, product_id, height} = this.props;
    const {visible, indexCurrency} = this.state;
    const dataImages = images.toJS();

    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => {
            this.flatListRef = ref;
          }}
          keyExtractor={(item, index) => `${item.id}${index}`}
          data={dataImages}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.993}
          renderItem={this.renderItem}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          getItemLayout={this.getItemLayout}
          ListHeaderComponent={
            dataImages.length < 1 ? (
              <Image
                source={require('src/assets/images/pDefault.png')}
                style={{height: height, width: width}}
              />
            ) : null
          }
        />
        <View style={styles.viewFooter}>
          <Pagination
            containerStyle={styles.viewPagination}
            activeVisit={indexCurrency}
            count={images.size}
          />
          <Icon
            name="upload"
            color={black}
            size={19}
            onPress={this.shareProduct}
            underlayColor="transparent"
          />
          {/*<Icon name="heart" color={black} size={19} />*/}
          <WishListIcon
            product_id={product_id}
            color={black}
            size={19}
            containerStyle={styles.iconWishlist}
          />
        </View>
        <Modal visible={visible} transparent={true}>
          <ImageViewer
            onCancel={() => this.setState({visible: false})}
            loadingRender={() => <ActivityIndicator />}
            enableSwipeDown={true}
            index={indexCurrency}
            imageUrls={images
              .map(image => ({
                url: image.get('src'),
              }))
              .toJS()}
            renderHeader={() => (
              <Container style={styles.viewHeaderImages}>
                <Icon
                  name="x"
                  size={24}
                  color={white}
                  iconStyle={styles.iconClose}
                  onPress={() => this.setState({visible: false})}
                />
              </Container>
            )}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewImage: {
    flex: 1,
    width: width,
    alignItems: 'center',
  },
  viewFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: margin.large,
    paddingHorizontal: padding.large,
  },
  viewPagination: {
    flexWrap: 'wrap',
    flex: 1,
    marginRight: margin.base,
  },
  iconWishlist: {
    marginLeft: margin.large,
  },
  viewHeaderImages: {
    position: 'absolute',
    top: 0,
    left: 0,
    // alignItems: 'flex-start',
    paddingTop: getStatusBarHeight(),
    zIndex: 9999,
  },
  iconClose: {
    paddingVertical: padding.base,
  },
});
export default ProductImages;
