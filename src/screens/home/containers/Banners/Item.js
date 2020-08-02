import React from 'react';
import {TouchableOpacity} from "react-native";
import {Image} from 'src/components';

const ImageBanner = ({ radius, clickBanner, contentContainerStyle, ...rest}) => {
  return (<TouchableOpacity
    style={[
      {
        borderRadius: radius ? radius: 0,
        overflow: 'hidden'
      },
      contentContainerStyle && contentContainerStyle,
    ]}
    activeOpacity={clickBanner ? 0.2: 1}
    onPress={clickBanner ? clickBanner: () => {}}
  >
    <Image
      resizeMode='stretch'
      {...rest}
    />
  </TouchableOpacity>)
};

export default ImageBanner
