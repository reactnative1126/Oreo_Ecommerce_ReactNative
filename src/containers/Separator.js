import React from 'react';

import { StyleSheet, View } from 'react-native';

import { margin } from 'src/components/config/spacing';

const Separator = function({ style, small, large, big, ...rest }) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.normal,
        small && styles.small,
        large && styles.large,
        big && styles.big,
        style && style,
      ])}
      {...rest}
    />
  );
};

const styles = {
  normal: {
    width: margin.base,
  },
  small: {
    width: margin.small,
  },
  large: {
    width: margin.large,
  },
  big: {
    width: margin.big,
  },
};

export default Separator;
