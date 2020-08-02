// @flow
import React from 'react';
import concat from 'lodash/concat';
import { StyleSheet, View, Animated, Text, ViewPropTypes } from 'react-native';
import Dot from './Dot';

import { grey3, grey5 } from 'src/components/config/colors';
import { margin } from 'src/components/config/spacing';

type Props = {
  type?: 'default' | 'animated',
  activeVisit: number | Animated.Value,
  count?: number,
  size?: number,
  color?: string,
  activeSize?: number,
  activeColor?: string,
  containerStyle?: ViewPropTypes,
  dotStyle?: ViewPropTypes,
};

const Pagination = (props: Props) => {
  const { type, activeVisit, count, size, color, activeSize, activeColor, containerStyle, dotStyle } = props;
  let dots = [];

  for (let i = 0; i < count; i++) {
    if (type === 'animated') {
      let sizeDot = activeVisit.interpolate({
        inputRange: [i - 1, i, i + 1],
        outputRange: [size, activeSize, size],
        extrapolate: 'clamp',
      });
      let radiusDot = Animated.divide(sizeDot, 2);
      let colorDot = activeVisit.interpolate({
        inputRange: [i - 1, i, i + 1],
        outputRange: [color, activeColor, color],
        extrapolate: 'clamp',
      });

      dots = concat(
        dots,
        <Dot
          key={i}
          size={sizeDot}
          color={colorDot}
          radius={radiusDot}
          style={[styles.dot, i === count - 1 && styles.lastDot, dotStyle && dotStyle]}
          Component={Animated.View}
        />
      );
    } else {
      dots = concat(
        dots,
        <Dot
          key={i}
          size={i === activeVisit ? activeSize : size}
          color={i === activeVisit ? activeColor : color}
          style={[styles.dot, i === count - 1 && styles.lastDot, dotStyle && dotStyle]}
        />
      );
    }
  }
  return <View style={[styles.container, containerStyle && containerStyle]}>{dots.map(dot => dot)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginRight: margin.small - 2,
  },
  lastDot: {
    marginRight: 0,
  },
});

Pagination.defaultProps = {
  type: 'default',
  count: 3,
  size: 7,
  color: grey3,
  activeSize: 9,
  activeColor: grey5,
};

export { Dot };
export default Pagination;
