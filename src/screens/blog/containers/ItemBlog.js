import React from 'react';
import {withNavigation} from 'react-navigation';
import unescape from 'lodash/unescape';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {withTheme, Text, Image} from 'src/components';
import InfoViewer from './InfoViewer';

import {blogStack} from 'src/config/navigator';
import {margin, padding, borderRadius} from 'src/components/config/spacing';

import {timeAgo} from 'src/utils/time';

const ItemBlog = ({navigation, item, theme, width, height, style, tz}) => {
  if (!item || typeof item !== 'object') {
    return null;
  }
  const imageStyle = {
    width,
    // height,
    flex: 1,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: theme.colors.border,
        },
        style && style
      ]}
      onPress={() =>
        navigation.navigate(blogStack.blog_detail, {blog: item, type: 'blog'})
      }
    >
      <Image
        source={
          item.rnlab_featured_media_url
            ? {uri: item.rnlab_featured_media_url}
            : require('src/assets/images/pDefault.png')
        }
        resizeMode="contain"
        style={imageStyle}
        containerStyle={styles.viewImage}
      />
      <View style={styles.viewRight}>
        <Text h4 medium style={styles.name}>{unescape(item.title.rendered)}</Text>
        <Text h6 colorThird style={styles.time}>{timeAgo(item.date, tz)}</Text>
        <InfoViewer
          categories={item._categories}
          urlUser={item.author_url}
        />
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: padding.big,
    borderBottomWidth: 1,
  },
  viewImage: {
    borderRadius: borderRadius.base,
    overflow: 'hidden'
  },
  viewRight: {
    marginLeft: margin.large,
    flex: 1
  },
  name: {
    marginBottom: margin.small,
  },
  time: {
    marginBottom: margin.big - 4
  },
});

ItemBlog.defaultProps = {
  width: 137,
  height: 123,
};

export default withNavigation(withTheme(ItemBlog));
