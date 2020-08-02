import React from 'react';
import Item2 from './Item2';

const List = ({
  data,
  width,
  height,
  navigationType
}) => {
  const widthImage = 78;
  const heightImage = (widthImage*height)/width;
  return data.map((item, index) => (
    <Item2
      key={index}
      item={item}
      width={widthImage}
      height={heightImage}
      style={index === data.length - 1 && {borderBottomWidth: 0}}
      navigationType={navigationType}
    />
  ))
};

List.defaultProps = {
  data: [],
  width: 204,
  height: 257,
};
export default List;
