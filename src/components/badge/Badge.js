import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import { ViewPropTypes, withTheme, fonts, spacing, sizes } from '../config';
import { renderNode } from '../helpers';

const size = 16;
const miniSize = 9;

const Badge = props => {
  const {
    containerStyle,
    textStyle,
    badgeStyle,
    onPress,
    Component = onPress ? TouchableOpacity : View,
    value,
    theme,
    status,
    ...attributes
  } = props;

  const element = renderNode(Text, value, {
    style: StyleSheet.flatten([styles.text, textStyle && textStyle]),
  });

  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          styles.badge(theme, status),
          !element && styles.miniBadge,
          badgeStyle && badgeStyle,
        ])}
        onPress={onPress}
      >
        {element}
      </Component>
    </View>
  );
};

Badge.propTypes = {
  containerStyle: ViewPropTypes.style,
  badgeStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  value: PropTypes.node,
  onPress: PropTypes.func,
  Component: PropTypes.func,
  theme: PropTypes.object,
  status: PropTypes.oneOf(['primary', 'success', 'warning', 'error', 'grey1', 'grey2']),
};

Badge.defaultProps = {
  status: 'primary',
};

const styles = {
  badge: (theme, status) => ({
    minWidth: 30,
    height: size,
    borderRadius: spacing.borderRadius.small,
    backgroundColor: theme.colors[status],
    alignItems: 'center',
  }),
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
  },
  text: {
    overflow: 'hidden',
    fontSize: sizes.base - 4,
    lineHeight: size,
    color: 'white',
    paddingHorizontal: 5,
    ...fonts.medium,
    ...Platform.select({
      android: {
        paddingTop: 0.5,
      },
      ios: {}
    })
  },
};

export { Badge };
export default withTheme(Badge, 'Badge');
