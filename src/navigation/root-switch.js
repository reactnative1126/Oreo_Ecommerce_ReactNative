import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { rootSwitch } from 'src/config/navigator';

import MainStack from './main-stack';
import AuthStack from './auth-stack';
import AuthDigitsStack from './auth-digits-stack';

import Loading from 'src/screens/loading';
import GetStart from 'src/screens/get-start';
import { SUPPORT_DIGITS_PLUGIN } from '../config/auth';

export default createAppContainer(
  createSwitchNavigator(
    {
      [rootSwitch.loading]: Loading,
      [rootSwitch.start]: GetStart,
      [rootSwitch.auth]: SUPPORT_DIGITS_PLUGIN ? AuthDigitsStack : AuthStack,
      [rootSwitch.main]: MainStack,
    },
    {
      initialRouteName: rootSwitch.loading,
    }
  )
);
