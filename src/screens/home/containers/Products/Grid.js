import React from 'react';
import {View, Dimensions} from 'react-native';
import ProductItem from 'src/containers/ProductItem';

import { isLineEndColumn } from 'src/utils/func';
import {margin, padding} from 'src/components/config/spacing';
const WIDTH_SCREEN = Dimensions.get('window').width;

const Grid = ({
  data,
  width,
  height,
  widthView,
  col,
  navigationType
}) => {
  const separator = padding.small;
  const column = col > 0 ? col : 1;
  const paddingSeparator = separator * (column - 1);
  const widthImage = (widthView -paddingSeparator)/column;
  const heightImage = (widthImage * height)/width;

  return (
    <View style={[
      { marginHorizontal: -separator/2, flexDirection: 'row', flexWrap: 'wrap'},
    ]}>
      {data.map((item, index) => (
        <View
          key={item.id}
          style={[
            {
              marginLeft: separator/2,
              marginRight: separator/2,
            },
            !isLineEndColumn(index, data.length, column) && {marginBottom: margin.small + margin.big}
          ]}
        >
          <ProductItem
            item={item}
            width={widthImage}
            height={heightImage}
            navigationType={navigationType}
          />
        </View>
      ))}
    </View>
  )
};

Grid.defaultProps = {
  data: [],
  width: 204,
  height: 257,
  widthView: WIDTH_SCREEN,
  col: 1,
};
export default Grid;
