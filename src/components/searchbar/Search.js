// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text as TextRN,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import Text from '../text/Text';
import Input from '../input/Input';
import Icon from '../icons/Icon';
import ViewPropTypes from 'src/components/config/ViewPropTypes';

import { withTheme } from '../config';
import { renderNode, nodeType } from '../helpers';
import { grey5, grey4 } from '../config/colors';
import { sizes } from '../config/fonts';
import { margin, padding, borderRadius } from '../config/spacing';

const defaultSearchIcon = {
  type: 'feather',
  size: 20,
  name: 'search',
};
const defaultClearIcon = {
  type: 'feather',
  name: 'x',
  size: 20,
  color: grey4,
};

class Search extends React.Component<Props> {
  constructor(props) {
    super(props);
    const { value } = props;

    this.state = {
      isEmpty: !value || value.length < 1,
    };
  }
  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
    this.props.onClear();
  };

  cancel = () => {
    this.blur();
    this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
  };

  onBlur = () => {
    this.props.onBlur();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
  };

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({ isEmpty: !text || text.length < 1 });
  };
  render() {
    const {
      theme,
      cancelButton,
      cancelButtonProps,
      cancelButtonTitle,
      clearIcon,
      containerStyle,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputContainerStyle,
      inputStyle,
      placeholderTextColor,
      showLoading,
      loadingProps,
      searchIcon,
      ...attributes
    } = this.props;
    const { isEmpty } = this.state;

    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    const colors = theme.SearchBar;
    const {
      buttonStyle,
      buttonTextStyle,
      color: buttonColor,
      disabled: buttonDisabled,
      buttonDisabledStyle,
      buttonDisabledTextStyle,
      ...otherCancelButtonProps
    } = cancelButtonProps;

    return (
      <View style={[styles.container, containerStyle && containerStyle]}>
        <Input
          {...attributes}
          testID="searchInput"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => {
            this.input = input;
          }}
          inputStyle={StyleSheet.flatten([styles.input(theme), inputStyle])}
          containerStyle={[
            styles.viewInput,
            {
              marginRight: cancelButton ? padding.large - 3 : 0,
            },
          ]}
          inputContainerStyle={StyleSheet.flatten([styles.inputContainer(colors.bgColor), inputContainerStyle])}
          leftIcon={renderNode(Icon, searchIcon, defaultSearchIcon)}
          leftIconContainerStyle={StyleSheet.flatten([styles.leftIconContainerStyle, leftIconContainerStyle])}
          placeholderTextColor={placeholderTextColor}
          rightIcon={
            <View style={styles.viewRightInput}>
              {showLoading && (
                <ActivityIndicator
                  key="loading"
                  style={StyleSheet.flatten([{ marginRight: 5 }, loadingStyle])}
                  {...otherLoadingProps}
                />
              )}
              {!isEmpty &&
                renderNode(Icon, clearIcon, {
                  ...defaultClearIcon,
                  color: theme.colors.secondary,
                  key: 'cancel',
                  onPress: this.clear,
                })}
            </View>
          }
          rightIconContainerStyle={StyleSheet.flatten([styles.rightIconContainerStyle, rightIconContainerStyle])}
        />
        {cancelButton && (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={this.cancel}
            disabled={buttonDisabled}
            {...otherCancelButtonProps}
          >
            <View style={[buttonStyle, buttonDisabled && buttonDisabledStyle]}>
              <Text
                style={[
                  styles.buttonTextStyle,
                  buttonColor && { color: buttonColor },
                  buttonTextStyle,
                  buttonDisabled && (buttonDisabledTextStyle || styles.buttonTextDisabled(theme)),
                ]}
                h6
              >
                {cancelButtonTitle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: padding.large,
  },
  input: theme => ({
    marginLeft: margin.small,
    fontSize: sizes.base,
    color: theme.colors.primary,
  }),
  inputContainer: bgColor => ({
    borderBottomWidth: 0,
    backgroundColor: bgColor,
    borderRadius: borderRadius.base,
    height: 46,
  }),
  viewInput: {
    paddingHorizontal: 0,
    flex: 1,
  },
  viewRightInput: {
    flexDirection: 'row',
  },
  rightIconContainerStyle: {
    marginRight: margin.large,
  },
  leftIconContainerStyle: {
    marginLeft: margin.large,
  },
  buttonTextStyle: {
    paddingHorizontal: 3,
    paddingVertical: padding.small,
  },
  buttonTextDisabled: theme => ({
    color: theme.colors.disabled,
  }),
});

Search.propTypes = {
  value: PropTypes.string,
  cancelButton: PropTypes.bool,
  cancelButtonProps: PropTypes.object,
  cancelButtonTitle: PropTypes.string,
  clearIcon: nodeType,
  searchIcon: nodeType,
  loadingProps: PropTypes.object,
  showLoading: PropTypes.bool,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  leftIconContainerStyle: ViewPropTypes.style,
  rightIconContainerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  inputStyle: TextRN.propTypes.style,
  placeholderTextColor: PropTypes.string,
};

Search.defaultProps = {
  value: '',
  cancelButton: true,
  cancelButtonTitle: 'Cancel',
  loadingProps: {},
  cancelButtonProps: {},
  showLoading: false,
  onClear: () => null,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null,
  placeholderTextColor: grey5,
  searchIcon: defaultSearchIcon,
  clearIcon: defaultClearIcon,
};

export default withTheme(Search);
