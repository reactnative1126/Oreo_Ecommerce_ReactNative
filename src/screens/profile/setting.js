import React from 'react';

import {connect} from 'react-redux';

import {Switch} from 'react-native';
import {Header, ListItem, ThemedView} from 'src/components';
import {TextHeader, CartIcon, IconHeader} from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import Language from './containers/Language';
import Currency from './containers/Currency';
import ConfigAdvanced from './containers/Advanced';

import {themeSelector} from 'src/modules/common/selectors';
import {switchMode} from 'src/modules/common/actions';
import {DARK} from 'src/modules/common/constants';
import {profileStack} from 'src/config/navigator';

import { ENABLE_CONFIG_DEMO } from 'src/config/development';

class SettingScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    const {
      theme,
      screenProps: {t},
      navigation,
    } = this.props;
    const titleProps = {
      medium: true,
    };
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_setting')} />}
          rightComponent={<CartIcon />}
        />
        <Container>
          <Language title={t('profile:text_language')} />
          <Currency title={t('profile:text_currency')} />
          <ConfigAdvanced title={t('profile:text_config_advanced')} />
          {/*<ListItem*/}
          {/*  title={t('profile:text_push_notification')}*/}
          {/*  type="underline"*/}
          {/*  titleProps={titleProps}*/}
          {/*  rightElement={<Switch />}*/}
          {/*/>*/}
          {/*<ListItem*/}
          {/*  title={t('profile:text_email_newsletter')}*/}
          {/*  type="underline"*/}
          {/*  titleProps={titleProps}*/}
          {/*  rightElement={<Switch />}*/}
          {/*/>*/}
          <ListItem
            title={t('profile:text_dark')}
            type="underline"
            titleProps={titleProps}
            rightElement={
              <Switch
                value={theme === DARK}
                onValueChange={this.props.switchMode}
              />
            }
          />
          {ENABLE_CONFIG_DEMO && <ListItem
            title={'Test Store'}
            type="underline"
            titleProps={titleProps}
            onPress={() => navigation.navigate(profileStack.demo_config)}
          />}
        </Container>
      </ThemedView>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: themeSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  switchMode: () => dispatch(switchMode()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingScreen);
