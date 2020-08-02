import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyleSheet } from 'react-native';
import { Text, ListItem } from 'src/components';
import { grey4 } from 'src/components/config/colors';

import { margin, padding } from 'src/components/config/spacing';
import { profileStack } from 'src/config/navigator';
import { icon, titleProps } from './config';

const InformationMe = ({ isLogin, clickPage }) => {
  const { t } = useTranslation();
  if (!isLogin) {
    return null;
  }
  return (
    <>
      <Text medium style={styles.title}>{t('profile:text_title_information')}</Text>
      <ListItem
        leftIcon={icon(0, 'info')}
        title={t('common:text_account')}
        type="underline"
        titleProps={titleProps}
        chevron
        pad={padding.large}
        onPress={() => clickPage(profileStack.account)}
      />
      <ListItem
        leftIcon={icon(1, 'info')}
        title={t('common:text_orders')}
        type="underline"
        titleProps={titleProps}
        chevron
        pad={padding.large}
        onPress={() => clickPage(profileStack.order_list)}
      />
      <ListItem
        leftIcon={icon(3, 'info')}
        title={t('common:text_downloads')}
        type="underline"
        titleProps={titleProps}
        chevron
        pad={padding.large}
        containerStyle={styles.itemEnd}
        onPress={() => clickPage(profileStack.downloads)}
      />
      {/*<ListItem*/}
      {/*  leftIcon={icon(2, 'info')}*/}
      {/*  title='Chat Vendors'*/}
      {/*  type="underline"*/}
      {/*  titleProps={titleProps}*/}
      {/*  chevron*/}
      {/*  pad={padding.large}*/}
      {/*  containerStyle={styles.itemEnd}*/}
      {/*  onPress={() => clickPage(profileStack.vendors)}*/}
      {/*/>*/}
    </>
  )
};
const styles = StyleSheet.create({
  title: {
    color: grey4,
    marginTop: margin.big + 4,
    marginBottom: margin.small
  },
  itemEnd: {
    borderBottomWidth: 0
  }
});

InformationMe.defaultProps = {
  isLogin: false,
  clickPage: () => { },
};
export default InformationMe;
