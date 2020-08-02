import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Avatar, withTheme} from 'src/components';
import Rating from 'src/containers/Rating';

import {timeAgo} from 'src/utils/time';
import {margin, padding} from 'src/components/config/spacing';

const ItemReview = ({data, style, theme, tz}) => {
  if (!data) {
    return null;
  }
  const {author} = data;

  return (
    <View
      style={[
        styles.container,
        {borderColor: theme.colors.border},
        style && style,
      ]}>
      <View style={styles.header}>
        <Avatar
          source={
            author && author.avatar
              ? {uri: author.avatar}
              : require('src/assets/images/pDefault.png')
          }
          size={40}
          rounded
        />
        <View style={styles.headerCenter}>
          <Text h5 medium style={styles.username}>
            {author && author.name ? author.name : 'undefined'}
          </Text>
          <Rating startingValue={data.rating} readonly />
        </View>
        <Text style={styles.date} colorThird>
          {timeAgo(data.date, tz)}
        </Text>
      </View>
      <Text h5 medium style={styles.title}>
        {data.title}
      </Text>
      <Text h6 colorThird>
        {data.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: padding.large,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: margin.large + 4,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: margin.small,
  },
  username: {
    marginBottom: 1,
  },
  date: {
    fontSize: 9,
    lineHeight: 12,
  },
  title: {
    marginBottom: 5,
  },
});

export default withTheme(ItemReview);
