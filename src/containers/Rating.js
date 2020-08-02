import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, Icon, Text} from 'src/components';

const Rating = ({
  theme,
  startingValue,
  count,
  color,
  size,
  readonly,
  pad,
  onStartRating,
  containerStyle
}) => {
  let listsIcon = [];

  for (let i = 1; i <= count; i++) {
    listsIcon.push(
      <Icon
        key={i}
        name={
          count <= startingValue || i <= startingValue
            ? 'star'
            : i > startingValue && i - 1 < startingValue
            ? 'star-half-empty'
            : 'star-o'
        }
        type="font-awesome"
        color={color ? color : theme.colors.warning}
        size={size}
        onPress={readonly ? null : () => onStartRating(i)}
        containerStyle={
          i < count && {
            paddingRight: pad,
          }
        }
      />,
    );
  }
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {listsIcon.map(icon => icon)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStart: {
    marginRight: 7,
  },
  textEnd: {
    marginLeft: 7,
  },
});

Rating.defaultProps = {
  startingValue: 1,
  count: 5,
  size: 12,
  pad: 4,
  readonly: false,
  onStartRating: () => {},
};

export default withTheme(Rating);
