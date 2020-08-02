import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Text, Avatar, withTheme } from 'src/components';
import Container from 'src/containers/Container';
import Rating from 'src/containers/Rating';
import ChartReview from './ChartReview';
import { dataRatingSelector } from 'src/modules/product/selectors';
import { margin } from 'src/components/config/spacing';
import fonts, { lineHeights, sizes } from 'src/components/config/fonts';


const InfoRating = ({ dataRating : { rating, lists, total }, theme}) => {
  const { t } = useTranslation();
  return (
    <Container style={styles.container}>
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
        {t('catalog:text_count_review', { count: total })}
      </Text>
      <Rating size={12} startingValue={rating} readonly />
      <ChartReview lists={lists} total={total} />
    </Container>
  )
};

const mapStateToProps = state => {
  return {
    dataRating: dataRatingSelector(state),
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: margin.big - 3,
    marginTop: margin.small
  },
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

export default compose(
  withTheme,
  connect(mapStateToProps),
)(InfoRating);
