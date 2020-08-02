// @flow

import React from 'react';
import unescape from 'lodash/unescape';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Badge, withTheme} from 'src/components';
import {grey6} from 'src/components/config/colors';
import {padding, margin} from 'src/components/config/spacing';

type itemList = {
  name: string,
  showNumber?: boolean,
  number?: number,
};

type Props = {
  list: Array<itemList>,
  visit?: string,
  clickButton: Function,
  pad?: number,
};

const ButtonGroup = (props: Props) => {
  const {
    lists,
    visit,
    clickButton,
    pad,
    containerStyle,
    scrollStyle,
    style,
    textStyle,
    theme,
    ...rest
  } = props;
  return (
    <View style={containerStyle && containerStyle}>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={scrollStyle && scrollStyle}
        {...rest}>
        {lists.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.item,
              style && style,
              index < lists.length - 1 && {marginRight: pad},
              index === visit && {borderColor: theme.Text.primary.color},
            ]}
            onPress={() => clickButton(index)}
          >
            <Text
              h4
              medium
              colorSecondary={index !== visit}
              style={[styles.name, textStyle && textStyle]}
            >
              {unescape(item.name)}
            </Text>
            {item.showNumber ? (
              <Badge
                value={item.number ? item.number : 0}
                status={'grey2'}
                textStyle={styles.textBadge}
                badgeStyle={styles.badge}
              />
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  name: {
    textTransform: 'uppercase',
  },
  badge: {
    minWidth: 16,
    marginLeft: margin.small,
  },
  textBadge: {
    color: grey6,
    paddingHorizontal: padding.small - 2,
  },
});

ButtonGroup.defaultProps = {
  lists: [],
  visit: 0,
  clickButton: () => {},
  pad: padding.large,
};

export default withTheme(ButtonGroup);
