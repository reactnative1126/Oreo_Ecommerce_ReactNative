import React, {Component} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, ScrollView, View, Linking} from 'react-native';
import {Header, ThemedView, Text} from 'src/components';

import HeaderMe from './containers/HeaderMe';
import SettingMe from './containers/SettingMe';
import InformationMe from './containers/InformationMe';
import Container from 'src/containers/Container';
import SocialIcon from 'src/containers/SocialIcon';
import {TextHeader, CartIcon} from 'src/containers/HeaderComponent';

import {authSelector} from 'src/modules/auth/selectors';
import {wishListSelector, configsSelector, languageSelector} from 'src/modules/common/selectors';

import {grey5} from 'src/components/config/colors';
import {margin} from 'src/components/config/spacing';

class MeScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  icon = name => {
    return {
      name: name,
      size: 18,
      color: grey5,
    };
  };

  handleLinkUrl = (url) => {
    Linking.openURL(url);
  };

  goPageOther = (router) => {
    this.props.navigation.navigate(router);
  };

  render() {
    const {
      configs,
      auth: {isLogin},
      screenProps: {t},
      language,
    } = this.props;

    return (
      <ThemedView isFullView>
        <Header centerComponent={<TextHeader title={t('common:text_me_screen')}/>} rightComponent={<CartIcon/>}/>
        <ScrollView>
          <Container style={styles.viewContent}>
            <HeaderMe/>
            <InformationMe
              isLogin={isLogin}
              clickPage={this.goPageOther}
            />
            <SettingMe
              isLogin={isLogin}
              clickPage={this.goPageOther}
              goPhone={this.handleLinkUrl}
              phonenumber={configs.get('phone')}
            />
            <View style={styles.viewSocial}>
              <SocialIcon
                light
                raised={false}
                type="facebook"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('facebook'))}
              />

              <SocialIcon
                light
                raised={false}
                type="instagram"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('instagram'))}
              />

              <SocialIcon
                light
                raised={false}
                type="pinterest"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('pinterest'))}
              />

              <SocialIcon
                light
                raised={false}
                type="twitter"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('twitter'))}
              />
            </View>
            <Text h6 colorThird >
              {typeof configs.get('copyright') === 'string'
                ? configs.get('copyright')
                : configs.getIn(['copyright', language])}
            </Text>
          </Container>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  viewContent: {
    marginTop: margin.large,
    marginBottom: margin.big,
  },
  viewSocial: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginVertical: margin.large + 4,
  },
  socialIconStyle: {
    width: 32,
    height: 32,
    margin: 0,
    marginHorizontal: margin.small / 2,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
    wishList: wishListSelector(state),
    configs: configsSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(MeScreen);
