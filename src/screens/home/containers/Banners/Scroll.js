import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import Item from './Item';

import {padding} from 'src/components/config/spacing';

const WIDTH_SCREEN = Dimensions.get('window').width;

const pDefault = require('src/assets/images/pDefault.png');

const Scroll = ({
  images,
  widthImage,
  heightImage,
  pad,
  radius,
  clickBanner,
  language,
  box
}) => {
  const styleImage = {
    width: widthImage,
    height: heightImage,
  };
  const paddingEnd = box ? padding.large : 0;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginLeft: -pad/2,
        marginRight: -pad/2,
      }}
    >
      {images.map((item, index) => (
        <Item
          key={index}
          source={item.image && item.image[language]
            ? { uri: item.image[language] }
            : pDefault}
          radius={radius}
          style={styleImage}
          clickBanner={() => clickBanner(item.action)}
          contentContainerStyle={{
            marginLeft: pad/2,
            marginRight: index === images.length -1 ? paddingEnd + pad/2: pad/2
          }}
        />
      ))}
    </ScrollView>
  )
};

Scroll.defaultProps = {
  images: [],
  col: 1,
  widthView: WIDTH_SCREEN,
  widthImage: 323,
  heightImage: 232,
  pad: 0,
  radius: 0,
  language: 'en',
};

export default Scroll;



