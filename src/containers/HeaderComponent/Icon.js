import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon as IconComponent } from 'src/components';
import { withNavigation } from 'react-navigation';

const Icon = ({ navigation, onPress, ...rest }) => {
  const handleClick = onPress ? onPress : () => navigation.goBack();

  return (
    <TouchableOpacity onPress={handleClick} style={{ padding: 6}}>
      <IconComponent name="chevron-left" size={26} isRotateRTL {...rest} />
    </TouchableOpacity>
  );
};

export default withNavigation(Icon);
