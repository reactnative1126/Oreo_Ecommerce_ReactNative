import React from 'react';

import {View, Dimensions} from 'react-native';
import CategoryItem from 'src/containers/CategoryItem';

import {margin, padding} from 'src/components/config/spacing';
import { isLineEndColumn } from 'src/utils/func';

const separator = padding.small;
const WIDTH_SCREEN = Dimensions.get('window').width;

const Grid = ({
  data,
  width,
  height,
  widthView,
  col,
  round,
  border,
  disableName,
}) => {
  const pad = separator/2;
  const paddingImages = separator * (col - 1);

  const widthItem = (widthView - paddingImages)/col;

  const widthImage = border ? widthItem - 2 * padding.small: widthItem;
  const heightImage = (widthImage*height)/width;

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -pad}}>
      {data.map((item, index) => (
        <CategoryItem
          key={item.id}
          item={item}
          width={widthImage}
          height={heightImage}
          round={round}
          border={border}
          disableName={disableName}
          style={[
            {
              marginHorizontal: pad
            },
            !isLineEndColumn(index, data.length, col) && {marginBottom: margin.large}
          ]}
        />
      ))}
    </View>
  )
};

Grid.defaultProps = {
  data:[],
  width: 90,
  height: 90,
  widthView: WIDTH_SCREEN,
  col: 2,
  round: false,
  border: false,
  disableName: false,
};
export default Grid;
