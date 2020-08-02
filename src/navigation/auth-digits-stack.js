import {authStack} from 'src/config/navigator';

import {createStackNavigator} from 'react-navigation-stack';

import Login from 'src/screens/auth-digits/login';
import LoginMobile from 'src/screens/auth-digits/login-mobile';
import Register from 'src/screens/auth-digits/register';
import Forgot from 'src/screens/auth-digits/forgot';

export default createStackNavigator(
  {
    [authStack.login]: Login,
    [authStack.login_mobile]: LoginMobile,
    [authStack.register]: Register,
    [authStack.forgot]: Forgot,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);
