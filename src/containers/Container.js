import React from 'react';

import { StyleSheet, View } from 'react-native';

import { padding } from 'src/components/config/spacing';

const Container = function({ disable, style, children, ...rest }) {
  return (
    <View style={StyleSheet.flatten([styles.container, disable && styles[disable], style])} {...rest}>
      {children}
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: padding.large,
  },
  right: {
    paddingRight: 0,
  },
  left: {
    paddingLeft: 0,
  },
  all: {
    paddingHorizontal: 0,
  },
};

export default Container;
