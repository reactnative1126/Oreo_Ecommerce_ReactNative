// @flow
import * as React from 'react';
import { View } from 'react-native';

type Props = {
  value: string,
};

const AttributeColor = (props: Props) => (
  <View
    style={{
      borderRadius: 10,
      width: 20,
      height: 20,
      backgroundColor: props.color,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
    }}
  />
);

export default AttributeColor;
