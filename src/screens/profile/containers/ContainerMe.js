import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'src/components';

const ContainerMe = function({ theme, children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bgColorPrimary,
      }}
    >
      {children}
    </View>
  );
};

export default withTheme(ContainerMe);
