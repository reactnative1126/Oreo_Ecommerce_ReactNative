// @flow
import * as React from 'react';
import { View } from 'react-native';
import { grey3 } from 'src/components/config/colors';

type Props = {
  size?: number,
  color?: string,
  radius?: number,
  Component?: React.Node,
};

const Dot = (props: Props) => {
  const { size, color, radius, Component, style } = props;
  const borderRadius = radius ? radius : typeof size === 'number' ? size / 2 : 0;
  return (
    <Component
      style={[
        {
          height: size,
          width: size,
          backgroundColor: color,
          borderRadius: borderRadius,
        },
        style && style,
      ]}
    />
  );
};

Dot.defaultProps = {
  size: 7,
  color: grey3,
  Component: View,
};
export default Dot;
