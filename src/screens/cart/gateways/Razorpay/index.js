import React, {Component} from 'react';

import {WebView} from 'react-native-webview';
import {ActivityIndicator, View} from 'react-native';
import {processPayment} from 'src/modules/order/service';

class Razorpay extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      pending: true,
      uri: '',
    }
  }

  componentDidMount() {
    this.progressPayment();
  }

  progressPayment = async () => {
    const {order} = this.props;
    const order_id = order.get('id');
    const payment_method = order.get('payment_method');
    const {code, data} = await processPayment({order_id, payment_method});
    if (code === 200) {
      this.setState({
        pending: false,
        uri: data.redirect,
      });
    }
  };

  handleResponse = data => {
    const {nextStep} = this.props;
    if (data.url.includes('order-received') && data.canGoBack) {
      nextStep();
    } else {
      return;
    }
  };

  render() {

    const {uri, loading, pending} = this.state;

    if (pending) {
      return <ActivityIndicator/>
    }

    return (
      <View style={{flex: 1}}>
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
      </View>
    );
  }
}

Razorpay.propTypes = {};

export default Razorpay;
