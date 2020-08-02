import React from 'react';

import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Avatar, Text, Badge, withTheme} from 'src/components';
import {Dot} from 'src/containers/Pagination';

import {green} from 'src/components/config/colors';
import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';
import NavigationService from 'src/utils/navigation';
import {profileStack} from 'src/config/navigator';

const ItemVendor = ({item, theme}) => {
  if (!item) {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        NavigationService.navigate(profileStack.chat_vendor, {store: item})
      }
    >
      <View style={styles.viewAvatar}>
        <Avatar
          source={
            item.avatar
              ? {uri: item.avatar}
              : require('src/assets/images/pDefault.png')
          }
          rounded
          size={60}
        />
        {item.countUnread ? (
          <Dot
            style={[
              styles.dot,
              {borderColor: theme.colors.border}
              ]}
            size={14}
            color={green}
          />
        ) : null}
      </View>
      <View style={[styles.content, {borderColor: theme.colors.border}]}>
        <View style={styles.viewName}>
          <Text h4 medium style={styles.name}>{item.name}</Text>
          <Text h6 colorThird>5:30 pm</Text>
        </View>
        <View style={styles.viewDescription}>
          <Text
            h6
            colorThird
            numberOfLines={1}
            style={styles.textDescription}>
            {item.chatEnd}
          </Text>
          {item.countUnread ? (
            <Badge
              value={item.countUnread}
              status={'error'}
              badgeStyle={styles.badge}
              textStyle={styles.textBadge}
              containerStyle={styles.containerBadge}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAvatar: {
    marginRight: margin.large,
  },
  dot: {
    borderWidth: 2,
    position: 'absolute',
    right: -7,
    top: 10,
  },
  content: {
    minHeight: 60,
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: padding.large,
  },
  viewName: {
    flexDirection: 'row',
    marginBottom: margin.small - 1,
    marginTop: margin.small - 3,
  },
  name: {
    flex: 1,
    marginRight: margin.large,
  },
  viewDescription: {
    flexDirection: 'row',
  },
  textDescription: {
    flex: 1,
    lineHeight: lineHeights.base,
  },
  badge: {
    height: 20,
    minWidth: 20,
    borderRadius: 10,
  },
  textBadge: {
    lineHeight: 20,
  },
  containerBadge: {
    marginLeft: margin.large,
  },
});
export default withTheme(ItemVendor);
