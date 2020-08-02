/**
 *
 * App router
 *
 *
 * App Name:          rn_oreo
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.1.0
 * Author:            Rnlab.io
 *
 * @since             1.0.0
 *
 * @format
 * @flow
 */

import React from 'react';

import './config-i18n';

import {StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {compose} from 'redux';
import merge from 'lodash/merge';

import FlashMessage from 'react-native-flash-message';

import lightColors, {darkColors} from './components/config/colors';

import {ThemeProvider} from 'src/components';
import Router from './navigation/root-switch';
import Unconnected from './containers/Unconnected';

import NavigationService from 'src/utils/navigation';
import {
  themeSelector,
  colorsSelector,
  languageSelector,
} from './modules/common/selectors';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isConnected: true,
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      const {isCheck} = this.state;
      const {isConnected} = state;
      if (!isConnected) {
        this.setState({
          isConnected: false,
        });
      }
      if (isCheck && isConnected) {
        this.setState({
          isConnected: true,
          isCheck: false,
        });
      }
    });
  }

  checkInternet = () => {
    this.setState({
      isCheck: true,
    });
  };

  render() {
    const {theme, colors, language, t, i18n} = this.props;
    const {isConnected} = this.state;

    // Change language
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }

    const themeColor = theme === 'light' ? merge(lightColors, {colors}) : darkColors;
    const barStyle = theme === 'light' ? 'dark-content' : 'light-content';

    return (
      <ThemeProvider theme={themeColor}>
        <StatusBar translucent barStyle={barStyle} backgroundColor="transparent"/>
        {!isConnected
          ? <Unconnected
            clickTry={this.checkInternet}
          />
          : <Router
            screenProps={{t, i18n, theme: themeColor}}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />}
        <FlashMessage position="top"/>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: languageSelector(state),
    theme: themeSelector(state),
    colors: colorsSelector(state),
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(AppRouter);
