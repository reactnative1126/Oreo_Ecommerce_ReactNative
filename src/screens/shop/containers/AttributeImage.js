// @flow
import * as React from 'react';
import { Image } from 'react-native';

type Props = {
  image: string,
};

const AttributeImage = (props: Props) => <Image style={{ width: 20, height: 20 }} source={{ uri: props.image }} />;

export default AttributeImage;
