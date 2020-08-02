// @flow
import React, {Component} from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import upperCase from 'lodash/upperCase';
import RNRestart from 'react-native-restart';
import isEmpty from 'lodash/isEmpty';

import {ScrollView, StyleSheet, Image, View, I18nManager} from 'react-native';
import {Text, ListItem, Modal} from 'src/components';
import Button from 'src/containers/Button';

import {
  languageSelector,
  listLanguageSelector,
} from 'src/modules/common/selectors';
import {changeLanguage} from 'src/modules/common/actions';

import i18n from 'src/config-i18n';

import {margin, padding} from 'src/components/config/spacing';

/**
 * Component Language
 * @param props
 * @returns {*}
 * @constructor
 */

type Props = {
  language: string,
  title: string,
};

class Language extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      language: props.language,
    };
  }

  reloadApp(language) {
    const isRTL = i18n.dir(language) === 'rtl';
    I18nManager.forceRTL(isRTL);
    // Reload
    if (isRTL !== I18nManager.isRTL) {
      RNRestart.Restart();
      // Updates.reloadFromCache(); // For expo
    }
  }

  handleSelect = () => {
    const {language} = this.state;
    const {dispatch} = this.props;
    this.setState({
      visible: false,
    });
    dispatch(changeLanguage(language));
    setTimeout(() => this.reloadApp(), 2000);
  };

  rightIcon = () => {
    const {languages, t} = this.props;
    const {visible, language} = this.state;
    const selectLanguage = languages[this.props.language];
    return (
      <View style={styles.right}>
        <Image
          source={
            selectLanguage &&
            selectLanguage.country_flag_url && {
              uri: selectLanguage.country_flag_url,
            }
          }
          resizeMode="contain"
          style={styles.image}
        />
        <Text h6 colorThird>
          {upperCase(
            selectLanguage && selectLanguage.language_code
              ? selectLanguage.language_code
              : language,
          )}
        </Text>
        <Modal
          visible={visible}
          setModalVisible={() =>
            this.setState({visible: false, language: this.props.language})
          }
          topRightElement={
            <Button
              onPress={this.handleSelect}
              title={t('common:text_select')}
              size={'small'}
              buttonStyle={styles.button}
            />
          }>
          <ScrollView>
            <View style={styles.viewList}>
              {Object.keys(languages).map(code => {
                const lang = languages[code];
                return (
                  <ListItem
                    key={code}
                    type="underline"
                    small
                    title={lang.translated_name || lang.native_name}
                    rightIcon={
                      lang.language_code === language && {
                        name: 'check',
                        type: 'feather',
                      }
                    }
                    titleProps={
                      lang.language_code !== language
                        ? {
                          colorSecondary: true,
                        }
                        : null
                    }
                    onPress={() => this.setState({language: code})}
                  />
                );
              })}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };

  render() {
    const {title, languages} = this.props;
    const {visible} = this.state;
    if (isEmpty(languages)) {
      return null;
    }
    return (
      <ListItem
        title={title}
        chevron
        type="underline"
        onPress={() => this.setState({visible: !visible})}
        rightElement={this.rightIcon()}
        titleProps={{
          medium: true,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 27,
    height: 14,
    marginRight: margin.small,
  },
  viewList: {
    paddingHorizontal: padding.big,
  },
  button: {
    paddingHorizontal: padding.big + 4,
  },
});

Language.defaultProps = {
  title: 'Languages',
};

const mapStateToProps = state => {
  return {
    language: languageSelector(state),
    languages: listLanguageSelector(state).toJS(),
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(Language);
