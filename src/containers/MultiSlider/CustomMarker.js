import React from 'react';

import { StyleSheet, Image, View } from 'react-native';
import { withTheme, Text } from 'src/components';
import currencyFormatter from 'currency-formatter';

import { padding, borderRadius } from 'src/components/config/spacing';
import DefaultMarker from './DefaultMarker';

const WIDTH_CIRCLE = 19;
const WIDTH_PREFIX = 70;
const SIZE_TRIANGLE = 7;

class CustomMarker extends React.Component {
  static defaultProps = {
    typeCurrency: 'USD',
    isCurrency: false,
  };
  render() {
    const { theme, typeCurrency, isCurrency, currentValue } = this.props;
    const value = isCurrency
      ? currencyFormatter.format(currentValue, {
          code: typeCurrency,
        })
      : currentValue;
    return (
      <View style={styles.container}>
        <View style={styles.c(theme.colors.bgColor, theme.colors.grey8)}>
          <View style={styles.c_small(theme.colors.primary)} />
        </View>
        <View style={styles.prefix}>
          <View style={styles.viewPrice(theme.colors.primary)}>
            <Text h6 style={styles.textValue(theme)}>
              {value}
            </Text>
          </View>
          <View style={styles.triangle(theme.colors.primary)} />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
  },
  c: (bg, border) => ({
    width: WIDTH_CIRCLE,
    height: WIDTH_CIRCLE,
    borderRadius: WIDTH_CIRCLE / 2,
    backgroundColor: bg,
    borderWidth: 1,
    borderColor: border,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  c_small: bg => ({
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: bg,
  }),
  prefix: {
    position: 'absolute',
    top: -50,
    left: -(WIDTH_PREFIX - WIDTH_CIRCLE) / 2,
    alignItems: 'center',
  },
  viewPrice: bg => ({
    minHeight: 30,
    width: WIDTH_PREFIX,
    padding: padding.small - 2,
    backgroundColor: bg,
    borderRadius: borderRadius.small,
    alignItems: 'center',
  }),
  triangle: border => ({
    width: 0,
    height: 0,
    borderTopWidth: SIZE_TRIANGLE,
    borderLeftWidth: SIZE_TRIANGLE,
    borderRightWidth: SIZE_TRIANGLE,
    borderTopColor: border,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  }),
  textValue: theme => ({
    color: theme.colors.bgColor,
    textAlign: 'center',
  }),
};

export default withTheme(CustomMarker);
