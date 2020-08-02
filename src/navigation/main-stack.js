import { mainStack } from 'src/config/navigator';

import { createStackNavigator } from 'react-navigation-stack';

import HomeDrawer from './home-drawer';

import Products from 'src/screens/shop/products';
import Search from 'src/screens/shop/search';

import Product from 'src/screens/shop/product';
import ProductReview from 'src/screens/shop/product-review';
import ProductReviewForm from 'src/screens/shop/product-review-form';
import ProductDescription from 'src/screens/shop/product-description';
import ProductAttribute from 'src/screens/shop/product-attribute';

import Refine from 'src/screens/shop/refine';
import FilterCategory from 'src/screens/shop/filter-category';
import FilterAttribute from 'src/screens/shop/filter-attribute';
import FilterTag from 'src/screens/shop/filter-tag';
import FilterPrice from 'src/screens/shop/filter-price';

import Checkout from 'src/screens/cart/checkout';

import Stores from 'src/screens/shop/stores';
import StoreDetail from 'src/screens/shop/store-detail';
import StoreReview from 'src/screens/shop/store-review';

import LinkingWebview from 'src/screens/linking-webview';

export default createStackNavigator(
  {
    [mainStack.home_drawer]: HomeDrawer,
    [mainStack.products]: Products,
    [mainStack.search]: Search,

    [mainStack.product]: Product,
    [mainStack.product_review]: ProductReview,
    [mainStack.product_review_form]: ProductReviewForm,
    [mainStack.product_attribute]: ProductAttribute,
    [mainStack.product_description]: ProductDescription,

    [mainStack.refine]: Refine,
    [mainStack.filter_category]: FilterCategory,
    [mainStack.filter_attribute]: FilterAttribute,
    [mainStack.filter_tag]: FilterTag,
    [mainStack.filter_price]: FilterPrice,

    [mainStack.checkout]: Checkout,

    [mainStack.store_detail]: StoreDetail,
    [mainStack.stores]: Stores,
    [mainStack.store_review]: StoreReview,

    [mainStack.linking_webview]: LinkingWebview,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
