import { Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import BackgroundImage from './BackgroundImage';
import colors, { lightColors, darkColors } from './colors';
import spacing from './spacing';
import ViewPropTypes from './ViewPropTypes';
import fonts, { sizes, lineHeights } from './fonts';
import ThemeProvider, { ThemeConsumer } from './ThemeProvider';
import withTheme from './withTheme';

const TextPropTypes = Text.propTypes;

export {
  BackgroundImage,
  colors,
  lightColors,
  darkColors,
  getStatusBarHeight,
  ViewPropTypes,
  TextPropTypes,
  fonts,
  sizes,
  lineHeights,
  ThemeProvider,
  ThemeConsumer,
  withTheme,
  spacing,
};
