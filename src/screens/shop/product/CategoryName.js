import React from 'react';
import {Text} from 'src/components';

export default ({ product, ...rest }) => {
  const name = product
    .get('categories')
    .map(category => category.get('name'))
    .join('   |   ');
  return (
    <Text h6 colorThird {...rest}>
      {name.toUpperCase()}
    </Text>
  );
};
