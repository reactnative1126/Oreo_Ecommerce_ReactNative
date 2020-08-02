import React from 'react';
import {View} from 'react-native';
import {withTheme} from 'src/components';

const HEIGHT = 6;

const LineReview = ({value, total, theme}) => {
  const colors = theme.LimeReviewProduct;
  const setTotal = total !== 0 ? total : value === 0 ? 1 : value;

  return (
    <View style={styles.container(colors)}>
      <View style={styles.line(colors, value / setTotal)} />
    </View>
  );
};

const styles = {
  container: colors => ({
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    flexDirection: 'row',
    backgroundColor: colors.color,
    overflow: 'hidden',
    opacity: 0.8,
  }),
  line: (colors, flex) => ({
    height: '100%',
    backgroundColor: colors.colorRating,
    flex: flex,
    borderRadius: HEIGHT / 2,
  }),
};
LineReview.defaultProps = {
  value: 0,
  total: 1,
};

export default withTheme(LineReview);
