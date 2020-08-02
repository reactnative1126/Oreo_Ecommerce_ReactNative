import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { withTheme } from 'src/components';
import { borderRadius } from 'src/components/config/spacing';

type Props = {
  theme: {},
  isSelect: boolean,
  image: string,
  size: number,
  disabled: boolean,
};

const VariationImage = (props: Props) => {
  const { theme, isSelect, image, size, disabled } = props;
  return (
    <ImageBackground
      source={{ uri: image }}
      style={[
        styles.image,
        {
          width: size,
          height: size,
        },
        disabled && styles.disabled,
      ]}
    >
      <View
        style={[
          styles.viewBorder,
          {
            borderColor: isSelect ? theme.colors.primary : 'transparent',
          },
        ]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: borderRadius.base,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.4,
  },
  viewBorder: {
    borderRadius: borderRadius.base,
    width: '100%',
    height: '100%',
    borderWidth: 2,
  },
});
VariationImage.defaultProps = {
  isSelect: false,
  size: 38,
  image: require('src/assets/images/pDefault.png'),
  disabled: false,
};

export default withTheme(VariationImage);
