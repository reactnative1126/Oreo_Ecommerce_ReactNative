import { cartStack } from 'src/config/navigator';

import { createStackNavigator } from 'react-navigation-stack';

import Cart from 'src/screens/cart/cart';
import Checkout from 'src/screens/cart/checkout';
import WeViewCheckout from 'src/screens/cart/webview-checkout';
import WeViewPayment from 'src/screens/cart/webview-payment';
import WeViewThankYou from 'src/screens/cart/webview-thankyou';

export default createStackNavigator(
  {
    [cartStack.cart]: Cart,
    [cartStack.checkout]: Checkout,
    [cartStack.webview_checkout]: WeViewCheckout,
    [cartStack.webview_payment]: WeViewPayment,
    [cartStack.webview_thank_you]: WeViewThankYou,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
