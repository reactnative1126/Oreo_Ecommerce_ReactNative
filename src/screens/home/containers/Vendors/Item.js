import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemedView, Text, Avatar, Icon, withTheme} from 'src/components';
import {margin, padding, borderRadius} from 'src/components/config/spacing';

const Item = ({item, style, theme}) => {
  const {rating} = item;
  const {rating: aveRating} = rating;
  const numRating = parseFloat(aveRating) ? parseFloat(aveRating) : 0;
  const valueRating = numRating.toFixed(1);
  return (
    <ThemedView colorSecondary style={[styles.container, style && style]}>
      <Avatar
        source={
          item.gravatar
            ? {uri: item.gravatar}
            : require('src/assets/images/pDefault.png')
        }
        size={60}
        rounded
        containerStyle={styles.image}
      />

      <Text h5 medium style={styles.name}>{item.store_name}</Text>
      <View style={styles.viewRating}>
        <Text h5 colorThird medium style={styles.textRating}>
          {valueRating}
        </Text>
        <Icon
          name="star"
          type="font-awesome"
          color={theme.colors.warning}
          size={13}
        />
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.large,
    width: 135,
    padding: padding.large,
    alignItems: 'center',
  },
  image: {
    marginBottom: margin.small + 1,
  },
  name: {
    marginBottom: 2,
    textAlign: 'center',
  },
  viewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRating: {
    marginRight: 5,
  },
});

export default withTheme(Item);
