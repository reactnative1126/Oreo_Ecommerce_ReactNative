import React from 'react';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';
import {View, Modal, Image, StyleSheet} from 'react-native';
import {Text, Avatar, withTheme} from 'src/components';
import Button from 'src/containers/Button';
import Container from 'src/containers/Container';
import {black, white} from 'src/components/config/colors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';
import {
  popupHomeSelector,
  languageSelector,
} from 'src/modules/common/selectors';
import {sizes, lineHeights} from 'src/components/config/fonts';
import action from 'src/utils/action';

const getInfoText = (data, language = 'en', size) => {
  let result = {};
  if (data && data.text) {
    const {text, style} = data;
    if (text[language]) {
      const styleHeading =
        style && typeof style === 'object' && !isEqual(style, {})
          ? size
            ? {
                ...style,
                lineHeight:
                  parseInt(style.fontSize) > sizes[size]
                    ? parseInt(style.fontSize) * 1.3
                    : lineHeights[size],
              }
            : style
          : {};
      result = Object.assign({}, result, {text: text[language], style: styleHeading});
    }
  }
  return result;
};

class ModalHomePopup extends React.Component {
  constructor(props) {
    super(props);
    const {popupData} = this.props;
    this.state = {
      visible: popupData.enable || false,
    };
  }
  renderHeadingText = () => {
    const {popupData, language} = this.props;
    const dataText = getInfoText(popupData.heading, language, 'h2');
    if (!dataText.text) {
      return null;
    }
    return (
      <Text
        h2
        medium
        style={{marginBottom: margin.small}}
        h2Style={dataText.style && dataText.style}>
        {dataText.text}
      </Text>
    );
  };

  renderTitleText = () => {
    const {popupData, language, theme} = this.props;

    const dataText = getInfoText(popupData.title, language, 'h6');
    if (!dataText.text) {
      return null;
    }
    const size =
      dataText.style && dataText.style.fontSize
        ? dataText.style.fontSize
        : sizes.h6;
    const minHeightBadge = parseInt((26 * size) / sizes.h6);
    const paddingBadge = (minHeightBadge - size) / 2;
    return (
      <View
        style={[
          styles.badge,
          {paddingVertical: paddingBadge, backgroundColor: theme.colors.error},
        ]}>
        <Text
          h6
          style={styles.textBadge}
          h6Style={dataText.style && dataText.style}>
          {dataText.text}
        </Text>
      </View>
    );
  };

  renderDescriptionText = () => {
    const {popupData, language} = this.props;
    const dataText = getInfoText(popupData.description, language);
    if (!dataText.text) {
      return null;
    }
    const lineHeight =
      dataText.style && dataText.style.fontSize
        ? parseInt((25 * dataText.style.fontSize) / sizes.h5)
        : 25;
    return (
      <Text
        style={[
          styles.description,
          dataText.style && dataText.style,
          {lineHeight: lineHeight},
        ]}>
        {dataText.text}
      </Text>
    );
  };

  renderButtonText = () => {
    const {popupData, language} = this.props;
    const dataText = getInfoText(popupData.text_button, language);
    if (!dataText.text) {
      return null;
    }
    return (
      <Button
        title={dataText.text}
        containerStyle={styles.button}
        onPress={this.clickButton}
        titleStyle={dataText.style}
      />
    );
  };

  clickButton = () => {
    const {popupData} = this.props;
    const {action_button} = popupData;
    if (action_button || action_button.type || action_button.id) {
      this.setState({
        visible: false,
      });
      action(action_button);
    }
  };

  render() {
    const {theme} = this.props;
    const {visible} = this.state;
    if (!visible) {
      return null;
    }
    return (
      <Modal visible={visible} transparent>
        <View style={styles.bgModal} />
        <View style={styles.viewContent}>
          <View style={styles.viewVertical} />
          <View
            style={[
              styles.content,
              {backgroundColor: theme.colors.listItemBg},
            ]}>
            <Image
              source={require('src/assets/images/mask.png')}
              resizeMode="contain"
            />
            <Container style={styles.info}>
              {this.renderHeadingText()}
              {this.renderTitleText()}
              {this.renderDescriptionText()}
              {this.renderButtonText()}
            </Container>
          </View>
          <View style={styles.viewVertical}>
            <Avatar
              size={34}
              rounded
              icon={{name: 'x', color: white}}
              overlayContainerStyle={styles.iconClose}
              onPress={() => this.setState({visible: false})}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  bgModal: {
    flex: 1,
    backgroundColor: black,
    opacity: 0.7,
  },
  viewContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewVertical: {
    height: 54,
    justifyContent: 'flex-end',
  },
  content: {
    width: 280,
    borderRadius: borderRadius.large,
  },
  info: {
    marginTop: margin.small,
    marginBottom: margin.large + 4,
    alignItems: 'center',
  },
  badge: {
    borderRadius: borderRadius.small + 1,
    justifyContent: 'center',
    paddingHorizontal: padding.small,
    marginBottom: margin.large + 2,
  },
  textBadge: {
    textTransform: 'uppercase',
    color: white,
  },
  description: {
    textAlign: 'center',
    marginBottom: margin.big - 4,
    marginHorizontal: margin.small + 1,
  },
  button: {
    width: '100%',
  },
  iconClose: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: white,
  },
});

const mapStateToProps = state => {
  return {
    popupData: popupHomeSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTheme(ModalHomePopup));
