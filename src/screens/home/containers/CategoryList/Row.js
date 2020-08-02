import React from 'react';
import {ScrollView} from 'react-native';
import CategoryItem from 'src/containers/CategoryItem';

import {padding} from 'src/components/config/spacing';
const separator = padding.large;

const Row = ({
  data,
  width,
  height,
  box,
  round,
  border,
  disableName,
}) => {
  const pad = separator/2;
  const padEnd = box ? padding.large: 0;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginHorizontal: -pad,
      }}
    >
      {data.map((item, index) => (
        <CategoryItem
          key={item.id}
          item={item}
          width={width}
          height={height}
          round={round}
          border={border}
          disableName={disableName}
          style={{
            marginLeft: pad,
            marginRight: index === data.length - 1 ? pad + padEnd : pad,
          }}
        />
      ))}
    </ScrollView>
  )
};

Row.defaultProps = {
  data:[],
  width: 90,
  height: 90,
  box: false,
  round: false,
  border: false,
  disableName: false,
};
export default Row;
