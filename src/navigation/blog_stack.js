import { blogStack } from 'src/config/navigator';

import { createStackNavigator } from 'react-navigation-stack';

import BlogList from 'src/screens/blog/blogs';
import BlogDetail from 'src/screens/blog/blog';

export default createStackNavigator(
  {
    [blogStack.blog_list]: BlogList,
    [blogStack.blog_detail]: BlogDetail,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
