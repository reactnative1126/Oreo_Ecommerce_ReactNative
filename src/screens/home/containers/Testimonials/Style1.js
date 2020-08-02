import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Image, withTheme} from 'src/components';

import {sizes} from 'src/components/config/fonts';
import {margin} from 'src/components/config/spacing';

const TestimonialItem1 = ({item, language, style, theme}) => {
  if (!item) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        style && style
      ]}
    >
      <Image
        source={item.image && item.image[language]
          ? {uri: item.image[language]}
          : require('src/assets/images/pDefault.png')}
        style={styles.image}
      />
      <View style={styles.right}>
        {item.title && item.title.text && (
          <Text
            medium
            style={[styles.title, item.title.style]}
          >{item.title.text[language]}</Text>
        )}
        {item.description && item.description.text && (
          <Text
            style={[
              styles.description,
              {color: theme.Text.secondary.color},
              item.description.style
            ]}
          >{item.description.text[language]}</Text>
        )}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  image: {
    width: 60,
    height: 60,
  },
  right: {
    flex: 1,
    marginLeft: margin.big - 4,
  },
  title: {
    fontSize: sizes.h4,
    marginBottom: margin.small - 3,
  },
  description: {
    fontSize: sizes.h6,
  }
});

TestimonialItem1.defaultProps = {
  language: 'en',
};

export default withTheme(TestimonialItem1);
