// @flow

import React, {Component} from 'react';
import { Platform } from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

// import isArray from 'lodash/isArray';
// import isObject from 'lodash/isObject';

import {connect} from 'react-redux';
import {fetchSettingSuccess} from 'src/modules/common/actions';
import {isGettingStartSelector} from 'src/modules/common/selectors';
import {isLoginSelector} from 'src/modules/auth/selectors';
import {fetchCategories} from 'src/modules/category/actions';
import {rootSwitch} from 'src/config/navigator';
import {fetchSetting, fetchConfig, fetchTemplate} from 'src/modules/common/service'

import SplashScreen from 'react-native-splash-screen';

type Props = {
  initSetting: Function,
  navigation: NavigationScreenProps,
};

class LoadingScreen extends Component<Props> {

  componentDidMount() {
    this.bootstrapAsync();
  }

  /**
   * Init data
   * @returns {Promise<void>}
   */
  bootstrapAsync = async () => {
    try {
      const {
        initSetting,
        fetchCategories,
        isGettingStart,
        isLogin,
        navigation,
      } = this.props;

      // Fetch setting
      let settings = await fetchSetting();
      // const configs = await fetchConfig();
      // const templates = await fetchTemplate();

      const { configs, templates, ...rest } = settings;

      initSetting({
        settings: rest,
        configs: configs,
        templates: templates
      });
      // Fetch categories
      fetchCategories();
      const router = isGettingStart ? rootSwitch.start : configs.requireLogin && !isLogin ? rootSwitch.auth : rootSwitch.main;
      navigation.navigate(router);
      SplashScreen.hide();
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    isGettingStart: isGettingStartSelector(state),
    isLogin: isLoginSelector(state),
  };
};

const mapDispatchToProps = {
  initSetting: fetchSettingSuccess,
  fetchCategories: fetchCategories,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoadingScreen);
