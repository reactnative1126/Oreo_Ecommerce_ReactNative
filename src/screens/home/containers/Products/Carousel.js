import React from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import ProductItem from 'src/containers/ProductItem';
import {padding} from 'src/components/config/spacing';

const WIDTH_SCREEN = Dimensions.get('window').width;

const Carousel = ({
  data,
  width,
  height,
  widthView,
  col,
  box,
  navigationType
}) => {
  const separator = padding.base;
  const paddingEnd = box ? padding.large: 0;
  const column = col > 0 ? col : 1.5;
  const widthImage = widthView/column;
  const heightImage =(widthImage * height)/width;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginHorizontal: -separator/2,
      }}
    >
      {data.map((item, index) => (
        <View
          key={item.id}
          style={{
            marginLeft: separator/2,
            marginRight: index === data.length - 1 ? separator/2 + paddingEnd: separator/2,
          }}
        >
          <ProductItem
            item={item}
            width={widthImage}
            height={heightImage}
            navigationType={navigationType}
          />
        </View>
      ))}
    </ScrollView>
  )
};

Carousel.defaultProps = {
  data: [],
  width: 204,
  height: 257,
  widthView: WIDTH_SCREEN,
  col: 1.5,
  box: false,
};
export default Carousel;
