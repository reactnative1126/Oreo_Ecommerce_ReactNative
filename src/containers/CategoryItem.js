// @flow
import React from 'react';
import unescape from 'lodash/unescape';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Image, Text } from 'src/components';

import { withNavigation } from 'react-navigation';

import { mainStack } from 'src/config/navigator';
import { red } from 'src/components/config/colors';
import { borderRadius, margin, padding } from 'src/components/config/spacing';

type Props = {
  item: Object,
  navigation: Object,
  width?: number,
  height?: number,
  round?: boolean,
  disableName?: boolean,
};

const CategoryItem = (props: Props) => {
  const { item, navigation, width, height, round, border, disableName, imgCateDefault, style } = props;
  const viewImage = {
    borderRadius: round ? width / 2 : borderRadius.base,
    overflow: 'hidden',
  };
  const image = {
    width,
    height,
  };
  let viewBorder = {};
  if (border) {
    const widthBorder = width + 2 * padding.small;
    const heightBorder = height +  2 * padding.small;
    viewBorder = {
      width: widthBorder,
      height: heightBorder,
      borderRadius: round ? widthBorder / 2 : borderRadius.base,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: red,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
  const widthTouch = border ? width +  2 * padding.small : width;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(mainStack.products, { id: item.id, name: item.name })}
      style={[{ width: widthTouch }, style && style]}
    >
      <View style={viewBorder}>
        <Image
          source={
            item && item.image && item.image.src
              ? {
                uri: item.image.src,
                cache: 'reload',
              }
              : imgCateDefault
          }
          resizeMode="stretch"
          containerStyle={viewImage}
          style={image}
        />
      </View>
      {disableName && (
        <Text h6 medium style={styles.text}>
          {unescape(item.name)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: margin.base,
  },
});

CategoryItem.defaultProps = {
  width: 109,
  height: 109,
  round: false,
  border: false,
  disableName: true,
  imgCateDefault: require('src/assets/images/imgCateDefault.png'),
};
export default withNavigation(CategoryItem);
