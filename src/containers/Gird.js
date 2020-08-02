import React from 'react';
import { View, StyleSheet } from 'react-native';

import { padding } from 'src/components/config/spacing';

const Row = ({ children, style }) => <View style={StyleSheet.flatten([styles.row, style])}>{children}</View>;

const Col = ({ children, style }) => <View style={StyleSheet.flatten([styles.col, style])}>{children}</View>;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginLeft: -(padding.base / 2),
    marginRight: -(padding.base / 2),
  },
  col: {
    flex: 1,
    paddingLeft: padding.base / 2,
    paddingRight: padding.base / 2,
  },
});

export { Row, Col };
