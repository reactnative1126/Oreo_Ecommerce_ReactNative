import React from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import ViewPropTypes from '../config/ViewPropTypes';

const SafeAreaView = ({forceInset, style, ...restProps}) => {
  const insets = useSafeArea();
  let padding = {};

  if (forceInset && typeof forceInset === 'object') {
    Object.keys(forceInset).forEach(key => {
      let inset = 0;

      if (forceInset[key] === 'always') {
        inset = insets[key];
      } else if (forceInset[key] === 'never') {
        inset = 0;
      }
      switch (key) {
        case 'left': {
          padding.paddingLeft = inset;
          break;
        }
        case 'right': {
          padding.paddingRight = inset;
          break;
        }
        case 'top': {
          padding.paddingTop = inset;
          break;
        }
        case 'bottom': {
          padding.paddingBottom = inset > 20 ? 20 : inset;
          break;
        }
      }
    })
  }
  return (
    <View
      {...restProps}
      style={StyleSheet.flatten([
        padding,
        style && style,
      ])}
    />
  );
};

SafeAreaView.propTypes = {
  style: ViewPropTypes.style,
  forceInset: PropTypes.exact({
    top: PropTypes.oneOf(['always', 'never']),
    bottom: PropTypes.oneOf(['always', 'never']),
    left: PropTypes.oneOf(['always', 'never']),
    right: PropTypes.oneOf(['always', 'never']),
  })
};

SafeAreaView.defaultProps = {
};

export default SafeAreaView;
