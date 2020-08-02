import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from 'src/screens/home';
import Category from 'src/screens/shop/category';
import WishList from 'src/screens/wishlist';

import ProfileStack from './profile-stack';
import CartStack from './cart-stack';

import Tabbar from 'src/containers/Tabbar';

import { homeTabs } from 'src/config/navigator';

const Tabs = createBottomTabNavigator(
  {
    [homeTabs.home]: {
      screen: Home,
    },
    [homeTabs.shop]: {
      screen: Category,
    },
    [homeTabs.wish_list]: {
      screen: WishList,
    },
    [homeTabs.cart]: {
      screen: CartStack,
      navigationOptions: ({ navigation }) => {
        const {state: {index}} = navigation
        return {
          tabBarVisible: index === 0,
        }
      },
    },
    [homeTabs.me]: {
      screen: ProfileStack,
    },
  },
  {
    defaultNavigationOptions: {
      // tabBarVisible: false
    },
    tabBarComponent: props => <Tabbar {...props}/>,
  }
);

export default Tabs;
