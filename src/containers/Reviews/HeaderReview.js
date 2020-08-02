// @flow
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import {Avatar, Text, ThemeConsumer} from 'src/components';
import Rating from '../Rating';
import fonts, {lineHeights, sizes} from 'src/components/config/fonts';
import {margin} from 'src/components/config/spacing';

type Props = {
  rating: number | string,
  count: number,
};

const HeaderReview = (props: Props) => {
  const {rating, count, style} = props;
  const {t} = useTranslation();

  return (
    <ThemeConsumer>
      {({theme}) => (
        <View style={[{alignItems: 'center'}, style && style]}>
          <Avatar
            rounded
            size={80}
            title={rating.toString()}
            titleStyle={[
              styles.titleRating,
              {
                color: theme.colors.error,
              },
            ]}
            overlayContainerStyle={styles.overlayAvatarRating}
            containerStyle={[
              styles.avatarRating,
              {
                borderColor: theme.colors.primary,
              },
            ]}
          />
          <Text colorThird style={styles.textReview}>
            {t('catalog:text_count_review', {count})}
          </Text>
          <Rating size={12} startingValue={rating} readonly />
        </View>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  titleRating: {
    fontSize: sizes.h1,
    lineHeight: lineHeights.h1,
    ...fonts.medium,
  },
  overlayAvatarRating: {
    backgroundColor: 'transparent',
  },
  avatarRating: {
    borderWidth: 2,
    marginBottom: margin.small,
  },
  textReview: {
    fontSize: 10,
    lineHeight: 15,
    marginBottom: margin.small,
  },
});

HeaderReview.defaultProps = {
  rating: '0.0',
  count: 0,
};

export default HeaderReview;
