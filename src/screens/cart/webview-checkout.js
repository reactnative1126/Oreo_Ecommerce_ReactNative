import React, {Component} from 'react';

import {WebView} from 'react-native-webview';
import {ActivityIndicator, View} from 'react-native';
import {ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';

import {cartStack} from 'src/config/navigator';
import {connect} from 'react-redux';
import queryString from 'query-string';
import { URL } from 'react-native-url-polyfill';

import {selectCartList} from 'src/modules/cart/selectors';
import {
  currencySelector,
  languageSelector,
  themeSelector,
  defaultLanguageSelector,
} from 'src/modules/common/selectors';
import {tokenSelector} from 'src/modules/auth/selectors';
import {clearCart} from 'src/modules/cart/actions';

import {API} from 'src/config/api';

class WebviewCheckout extends Component {
  webview = null;
  request = null;

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      visible: false,
      canGoBack: false,
      canGoForward: false,
    };
  }

  setModalVisible = visible => {
    this.setState({
      visible,
    });
  };

  handleResponse = (request) => {
    const {url, canGoForward, canGoBack} = request;
    const {navigation, theme, dispatch, currency} = this.props;

    const parsed = queryString.parse(new URL(url).search);
    console.log(parsed);

    if (url.includes('/order-received/')) {
      navigation.replace(cartStack.webview_thank_you, {uri: `${url}&mobile=1&theme=${theme}&currency=${currency}`});
    }

    if (url.includes('/order-pay/')) {
      navigation.replace(cartStack.webview_payment, {uri: `${url}&mobile=1&theme=${theme}&currency=${currency}`});
    }

    // Cancel order
    if (parsed.cancel_order) {
      navigation.goBack();
    }

    if (!parsed.cancel_order && url.includes(`${API}/cart`)) {
      dispatch(clearCart());
      navigation.goBack();
    }

    this.setState({
      canGoBack,
      canGoForward,
    });

  };

  handleGoBack = () => {
    const {navigation} = this.props;
    const {canGoBack} = this.state;
    if (this.webview && canGoBack) {
      this.webview.goBack();
    } else {
      navigation.goBack();
    }
  };

  handleGoForward = () => {
    const {navigation} = this.props;
    const {canGoForward} = this.state;
    if (this.webview && canGoForward) {
      this.webview.goForward();
    } else {
      navigation.goForward();
    }
  };

  render() {
    const {loading, canGoForward} = this.state;
    const {line_items, currency, theme, language, defaultLanguage, screenProps: {t}, token} = this.props;
    let checkoutQuery = {
      mobile: 1,
      theme,
      currency: currency,
      line_items: JSON.stringify(line_items.map(item => {
        return {
          product_id: item.get('product_id'),
          quantity: item.get('quantity') ? item.get('quantity') : 1,
          variation_id: item.getIn(['variation', 'id']) ? item.getIn(['variation', 'id']) : 0,
          meta_data: item.get('meta_data').map(md => ({key: md.get('key'), value: md.get('name')})),
        };
      }).toJS()),
    };

    // Change language on web
    if (language !== defaultLanguage) {
      checkoutQuery = Object.assign({}, {lang: language}, checkoutQuery);
    }

    if (token) {
      checkoutQuery = Object.assign({}, {token}, checkoutQuery);
    }

    const uri = `${API}/checkout?${queryString.stringify(checkoutQuery, {arrayFormat: 'comma'})}`;

    return (
      <ThemedView isFullView>
        <Header
          centerComponent={<TextHeader title={t('common:text_checkout_web')}/>}
          leftComponent={<IconHeader onPress={this.handleGoBack}/>}
          rightComponent={canGoForward ? <IconHeader name="chevron-right" onPress={this.handleGoForward}/> : null}
        />
        <WebView
          source={{
            uri,
          }}
          ref={ref => (this.webview = ref)}
          onNavigationStateChange={this.handleResponse}
          style={{flex: 1, backgroundColor: 'transparent'}}
          onLoad={() => this.setState({loading: false})}
        />
        {loading && (
          <View
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}
          >
            <ActivityIndicator
              size="large"
            />
          </View>
        )}
      </ThemedView>
    );
  }
}

WebviewCheckout.propTypes = {};

const mapStateToProps = state => {
  return {
    line_items: selectCartList(state),
    currency: currencySelector(state),
    theme: themeSelector(state),
    language: languageSelector(state),
    defaultLanguage: defaultLanguageSelector(state),
    token: tokenSelector(state),
  };
};

export default connect(mapStateToProps)(WebviewCheckout);
