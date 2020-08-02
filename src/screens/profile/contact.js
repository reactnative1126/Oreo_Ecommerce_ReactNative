import React from 'react';
import {connect} from 'react-redux';
import {View, Image, ImageBackground, Dimensions} from 'react-native';
import {Header, Icon, Text, ThemedView} from 'src/components';

import {IconHeader} from 'src/containers/HeaderComponent';

import {configsSelector, languageSelector} from 'src/modules/common/selectors';

import {grey5} from 'src/components/config/colors';
import {margin, padding, borderRadius} from 'src/components/config/spacing';

const {width} = Dimensions.get('window');

class ContactScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    const {
      configs,
      screenProps: {theme, t},
      language,
    } = this.props;
    return (
      <ThemedView isFullView colorSecondary>
        <ImageBackground
          source={require('src/assets/images/map.png')}
          style={styles.imagebg}>
          <Header
            leftComponent={<IconHeader />}
            containerStyle={styles.header}
          />
          <View style={styles.content(theme.Modal.backgroundColor)}>
            <Text h2 medium style={styles.title}>
              {t('profile:text_name_contact')}
            </Text>
            <View style={styles.row}>
              <View
                style={[
                  styles.flex,
                  styles.marginRight('small'),
                  styles.listInfo,
                ]}>
                <View style={[styles.viewInfo, styles.row]}>
                  <Icon
                    name="mail"
                    type="feather"
                    size={15}
                    color={grey5}
                    containerStyle={styles.marginRight('small')}
                  />
                  <Text>{configs.get('email')}</Text>
                </View>
                <View style={[styles.viewInfo, styles.row]}>
                  <Icon
                    name="phone-call"
                    type="feather"
                    size={15}
                    color={grey5}
                    containerStyle={styles.marginRight('small')}
                  />
                  <Text>{configs.get('phone')}</Text>
                </View>
                <View style={[styles.viewInfo, styles.row]}>
                  <Icon
                    name="map"
                    type="feather"
                    size={15}
                    color={grey5}
                    containerStyle={styles.marginRight('small')}
                  />
                  <Text>
                    {typeof configs.get('address') === 'string' ? configs.get('address') : configs.getIn(['address', language])}
                  </Text>
                </View>
              </View>
              <Image
                source={require('src/assets/images/maps-and-flags.png')}
                resizeMode="stretch"
              />
            </View>
          </View>
        </ImageBackground>
      </ThemedView>
    );
  }
}

const styles = {
  imagebg: {
    width,
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: 'transparent',
  },
  content: bgColor => ({
    backgroundColor: bgColor,
    paddingVertical: padding.big,
    paddingHorizontal: padding.big,
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
  }),
  title: {
    marginBottom: margin.big - margin.base,
  },
  listInfo: {
    flex: 1,
    marginTop: margin.base,
  },
  row: {
    flexDirection: 'row',
  },
  marginRight: size => ({
    marginRight: margin[size],
  }),
  viewInfo: {
    alignItems: 'center',
    marginBottom: margin.base,
  },
};

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(ContactScreen)
