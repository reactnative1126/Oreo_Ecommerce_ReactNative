import React from 'react';

import {connect} from 'react-redux';

import {View, I18nManager} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {showMessage} from 'react-native-flash-message';
import {Header, ThemedView} from 'src/components';
import Container from 'src/containers/Container';
import Button from 'src/containers/Button';
import ButtonSwiper from 'src/containers/ButtonSwiper';
import {TextHeader} from 'src/containers/HeaderComponent';
import Empty from 'src/containers/Empty';
import CartItem from './containers/CartItem';
import CartTotal from './containers/CartTotal';
import Coupon from './containers/Coupon';

import {
  mainStack,
  homeTabs,
  cartStack,
  authStack,
} from 'src/config/navigator';
import { margin } from 'src/components/config/spacing';
import { selectCartList, cartSizeSelector } from 'src/modules/cart/selectors';
import { removeCart, changeQuantity } from 'src/modules/cart/actions';
import {
  wishListSelector,
  currencySelector,
  defaultCurrencySelector,
  configsSelector,
  getSiteConfig,
} from 'src/modules/common/selectors';
import { addWishList, removeWishList } from 'src/modules/common/actions';
import { checkQuantity } from 'src/utils/product';
import { isLoginSelector } from '../../modules/auth/selectors';

class CartScreen extends React.Component {
  goToProduct = product => {
    const {navigation} = this.props;
    navigation.navigate(mainStack.product, {product});
  };

  changeQuantity = (item, quantity) => {
    const {dispatch} = this.props;
    const {product} = item;

    const check = checkQuantity(product, quantity);

    if (check) {
      if (quantity > 0) {
        dispatch(changeQuantity(item, quantity));
      } else {
        dispatch(removeCart(item));
      }
    } else {
      showMessage({
        message: 'Can\'t change quantity',
        description: 'The quantity out of stock on store.',
        type: 'danger',
      });
    }
  };

  getHandleWishList = (product_id) => {
    const { wishList, dispatch } = this.props;
    const hasList = wishList.has(product_id);
    const wishListAction = hasList ? () => dispatch(removeWishList(product_id)) : () => dispatch(addWishList(product_id));
    return {
      type: hasList ? 'like' : 'unlike',
      onPress: wishListAction
    }
  };

  renderData = () => {
    const {
      screenProps: {t},
      line_items,
      dispatch,
      navigation,
      currency,
      defaultCurrency,
      configs,
      siteConfig,
      isLogin
    } = this.props;
    if (line_items.size < 1) {
      return (
        <Empty
          icon="shopping-bag"
          title={t('empty:text_title_cart')}
          subTitle={t('empty:text_subtitle_cart')}
          clickButton={() => navigation.navigate(homeTabs.shop)}
        />
      );
    }
    const widthButton = configs.get('toggleWishlist') ? 140 : 70;
    const webviewCheckout = configs.get('webviewCheckout', true);
    return (
      <>
        <CartTotal style={styles.viewTotal}/>
        <SwipeListView
          useFlatList
          removeClippedSubviews={false}
          keyExtractor={(item, index) => `${item.product_id}-${item.variation ? item.variation.id : ''}-${index}`}
          data={line_items.toJS()}
          renderItem={({item, index}) => (
            <CartItem
              currency={currency}
              defaultCurrency={defaultCurrency}
              index={index}
              item={item}
              changeQuantity={this.changeQuantity}
              goToProduct={this.goToProduct}
              style={index === 0 && styles.firstItem}
            />
          )}
          renderHiddenItem={({item}) => (
            <View style={styles.viewButton}>
              {configs.get('toggleWishlist') && <ButtonSwiper {...this.getHandleWishList(item.product.id)} />}
              <ButtonSwiper onPress={() => dispatch(removeCart(item))} />
            </View>
          )}
          leftOpenValue={widthButton}
          rightOpenValue={-widthButton}
          disableLeftSwipe={I18nManager.isRTL}
          disableRightSwipe={!I18nManager.isRTL}
          ListFooterComponent={!webviewCheckout ? <Container>
            <Coupon/>
          </Container> : null}
        />
        <Container style={styles.footerScrollview}>
          <Button title={t('cart:text_go_checkout')} onPress={() => {
            console.log(siteConfig.get('enable_guest_checkout'), isLogin);
            if (siteConfig.get('enable_guest_checkout') === 'no' && !isLogin) {
              navigation.navigate(authStack.login);
            } else {
              navigation.navigate(webviewCheckout ? cartStack.webview_checkout : mainStack.checkout)
            }
          }}/>
        </Container>
      </>
    );
  };

  render() {
    const {
      screenProps: {t},
      size,
    } = this.props;

    const subtitleHeader = size > 1 ? t('common:text_items', {count: size}) : t('common:text_item', {count: size});

    return (
      <ThemedView isFullView>
        <Header centerComponent={<TextHeader title={t('common:text_cart')} subtitle={subtitleHeader}/>}/>
        {this.renderData()}
      </ThemedView>
    );
  }
}

const styles = {
  viewTotal: {
    marginBottom: margin.large - 2,
  },
  firstItem: {
    borderTopWidth: 1,
  },
  viewButton: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerScrollview: {
    marginVertical: margin.large,
  },
};

CartScreen.defaultProps = {
};

const mapStateToProps = state => {
  return {
    line_items: selectCartList(state),
    size: cartSizeSelector(state),
    wishList: wishListSelector(state),
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
    configs: configsSelector(state),
    siteConfig: getSiteConfig(state),
    isLogin: isLoginSelector(state),
  };
};

export default connect(mapStateToProps)(CartScreen);
