import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { withTheme, Icon } from 'src/components';

const ButtonSwiper = ({ type, style, theme, ...rest }) => {
  const { ButtonSwiper: colors} = theme;
  const objColor = colors[type] ? colors[type] : colors.default;
  const icon = type === 'unlike' ? 'heart-o' : type === 'like'? 'heart' : 'trash-2';
  const iconType = type === 'unlike' ? 'font-awesome' : type === 'like'? 'font-awesome' : 'feather';

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: objColor.backgroundColor
        },
        style && style
      ]}>
      <Icon name={icon} size={17} color={objColor.color} type={iconType} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ButtonSwiper.defaultProps = {
  type: 'delete',
  activeOpacity: 0.75
};

export default withTheme(ButtonSwiper);
