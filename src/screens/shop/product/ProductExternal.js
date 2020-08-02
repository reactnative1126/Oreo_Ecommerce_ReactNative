import React from 'react';
import {Linking} from 'react-native';
import Button from 'src/containers/Button';

const ProductExternal = ({product}) => {
  if (!product || !product.get('id')) {
    return null;
  }
  return (
    <Button
      title={product.get('button_text')}
      onPress={() => Linking.openURL(product.get('external_url'))}
    />
  );
};

export default ProductExternal;
