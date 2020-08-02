import React from 'react';

import { StyleSheet } from 'react-native';
import { withTheme, SocialIcon } from 'src/components';

import { borderRadius, padding } from 'src/components/config/spacing';
import fonts, { sizes } from 'src/components/config/fonts';

const ComponentSocialIcon = function({ theme, style, ...rest }) {
  return (
    <SocialIcon
      style={StyleSheet.flatten([
        styles.base,
        {borderColor: theme.colors.border},
        style && style
      ])}
      fontStyle={{
        ...fonts.medium,
        fontSize: sizes.base,
      }}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.base,
    paddingBottom: padding.base - 1,
    paddingTop: padding.base - 1,
    marginHorizontal: 0,
    borderWidth: 1,
  },
});

ComponentSocialIcon.defaultProps = {
  color: 'primary',
  loadingProps: {},
};

export default withTheme(ComponentSocialIcon);
