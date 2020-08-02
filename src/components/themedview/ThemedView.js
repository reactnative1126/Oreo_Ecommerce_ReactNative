import React from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';

import { withTheme } from '../config';

import ViewPropTypes from '../config/ViewPropTypes';

const ThemedViewElement = ({ colorSecondary, isFullView, style, theme, ...restProps }) => {
  return (
    <View
      {...restProps}
      style={StyleSheet.flatten([
        {
          backgroundColor: colorSecondary ? theme.colors.bgColorSecondary : theme.colors.bgColor,
        },
        isFullView && { flex: 1 },
        style && style,
      ])}
    />
  );
};

ThemedViewElement.propTypes = {
  colorSecondary: PropTypes.bool,
  isFullView: PropTypes.bool,
  style: ViewPropTypes.style,
};

ThemedViewElement.defaultProps = {
  colorSecondary: false,
  isFullView: false,
};

export default withTheme(ThemedViewElement, 'ThemedView');
