import React, {Component} from 'react';

import {WebView} from 'react-native-webview';
import {ActivityIndicator, View} from 'react-native';
import {ThemedView} from 'src/components';
import Button from 'src/containers/Button';
import Container from 'src/containers/Container';
import {homeTabs} from 'src/config/navigator';
import {connect} from 'react-redux';
import {clearCart} from 'src/modules/cart/actions';
import {margin} from 'src/components/config/spacing';

class WebviewThankYou extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      uri: props.navigation.getParam('uri', ''),
    }
  }

  handleContinue = () => {
    const { navigation, dispatch } = this.props;
    dispatch(clearCart());
    navigation.pop();
    navigation.navigate(homeTabs.shop);
  };

  handleResponse = data => {
    console.log(data);
  };

  render() {
    const {loading, uri} = this.state;
    const { screenProps: { t } } = this.props;
    return (
      <ThemedView isFullView>
        <WebView
          source={{uri}}
          onNavigationStateChange={data =>
            this.handleResponse(data)
          }
          style={{flex: 1}}
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
        <Container style={{ marginVertical: margin.big}}>
          <Button title={t('cart:text_shopping')} onPress={this.handleContinue} />
        </Container>
      </ThemedView>
    );
  }
}

WebviewThankYou.propTypes = {};

export default connect()(WebviewThankYou);
