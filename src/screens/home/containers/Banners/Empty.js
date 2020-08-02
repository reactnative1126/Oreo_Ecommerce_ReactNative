import React from 'react';

import {Dimensions} from 'react-native';
import Item from './Item';

const WIDTH_SCREEN = Dimensions.get('window').width;

const pDefault = require('src/assets/images/pDefault.png');

const Empty = ({widthView, width, height, radius}) => {
  const widthImage = widthView;
  const heightImage = (widthImage*height)/width;

  const style = {
    width: widthImage,
    height: heightImage,
  };

  return (
    <Item
      source={pDefault}
      style={style}
      radius={radius}
    />
  )
};

Empty.defaultProps = {
  widthView: WIDTH_SCREEN,
  width: 370,
  height: 395,
  radius: 0,
};

export default Empty;
