import React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer';

import { Platform, Dimensions, I18nManager } from 'react-native';

import HomeTab from './home-tabs';
import BlogStack from './blog_stack';

import Sidebar from 'src/containers/Sidebar';

import { homeDrawer } from 'src/config/navigator';

const { width } = Dimensions.get('window');

const WIDTH_DRAWER = width * 0.78;

export default createDrawerNavigator(
  {
    [homeDrawer.home_tab]: HomeTab,
    [homeDrawer.screen2]: HomeTab,
    [homeDrawer.screen3]: HomeTab,
    [homeDrawer.blog]: BlogStack,
  },
  {
    defaultNavigationOptions: {
      drawerLockMode: 'unlocked',
    },
    edgeWidth: 0,
    minSwipeDistance: width,
    drawerWidth: WIDTH_DRAWER,
    drawerPosition: I18nManager.isRTL ? 'right' : 'left',
    contentComponent: props => <Sidebar {...props} />,
  }
);
