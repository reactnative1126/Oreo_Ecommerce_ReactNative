// @flow
import React from 'react';
import { withTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text, Avatar, withTheme } from 'src/components';
import Button from './Button';
import { red } from 'src/components/config/colors';
import { padding, margin } from 'src/components/config/spacing';

type Props = {
  icon: string,
  titleButton?: string,
  clickButton?: void => {},
  title: string,
  subTitle: string,
  avatarProps?: object,
};

const Empty = (props: Props) => {
  const { theme, icon, titleButton, clickButton, avatarProps, buttonProps, title, subTitle, avatarElement, t } = props;

  const nameButton = titleButton ? titleButton : t('common:text_shopping_now');
  const onPressButton = clickButton ? clickButton : () => {};

  const iconValue = avatarProps && avatarProps.icon ? avatarProps.icon : {};
  const iconContainerStyle = avatarProps && avatarProps.containerStyle ? avatarProps.containerStyle : {};
  const iconOverlay = avatarProps && avatarProps.overlayContainerStyle ? avatarProps.overlayContainerStyle : {};

  const buttonStyle = buttonProps && buttonProps.buttonStyle ? buttonProps.buttonStyle : {};
  const containerStyle = buttonProps && buttonProps.containerStyle ? buttonProps.containerStyle : {};

  const avatar = avatarElement ? avatarElement : (<Avatar
    size={95}
    rounded
    {...avatarProps}
    icon={{
      name: icon,
      size: 42,
      color: red,
      ...iconValue,
    }}
    containerStyle={[
      {
        marginBottom: margin.big + 4,
      },
      iconContainerStyle,
    ]}
    overlayContainerStyle={[
      {
        backgroundColor: theme.colors.bgColorSecondary,
      },
      iconOverlay,
    ]}
  />);

  return (
    <View style={styles.container}>
      {avatar}
      <Text medium h2 style={styles.textTitle}>
        {title}
      </Text>
      <Text colorSecondary style={styles.textSubtitle}>
        {subTitle}
      </Text>
      <Button
        type="outline"
        {...buttonProps}
        title={nameButton}
        onPress={onPressButton}
        buttonStyle={[styles.button, buttonStyle && buttonStyle]}
        containerStyle={[styles.containerButton, containerStyle && containerStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: padding.big + padding.base,
  },
  box: {
    marginBottom: margin.big + 4,
  },
  textTitle: {
    marginBottom: margin.small,
    textAlign: 'center',
  },
  textSubtitle: {
    marginBottom: margin.big + margin.base,
    textAlign: 'center',
  },
  containerButton: {
    minWidth: 160,
  },
  button: {
    paddingHorizontal: margin.big + 4,
  },
});

Empty.defaultProps = {};

export default withTranslation()(withTheme(Empty));
