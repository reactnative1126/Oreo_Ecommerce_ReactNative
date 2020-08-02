import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Header, Text, ThemedView } from 'src/components';

import Container from 'src/containers/Container';
import { TextHeader, IconHeader, CartIcon } from 'src/containers/HeaderComponent';

import { margin } from 'src/components/config/spacing';
import { lineHeights } from 'src/components/config/fonts';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    const {
      screenProps: { t, theme },
    } = this.props;
    const image =
      theme.key === 'dark' ? require('src/assets/images/searchDark.png') : require('src/assets/images/searchLight.png');

    return (
      <ThemedView style={styles.full}>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_about')} />}
          rightComponent={<CartIcon />}
        />
        <ScrollView>
          <Container>
            <Text h2 medium>
              {t('common:text_about')}
            </Text>
            <Text h2 style={styles.textName(theme.AboutUsScreen.titleColor)}>
              {t('profile:text_name_about')}
            </Text>
            <View style={styles.viewImage}>
              <Image source={image} resizeMode="stretch" />
              <Text style={{ color: theme.AboutUsScreen.researchColor }}>{t('profile:text_research')}</Text>
              <Image source={require('src/assets/images/ux.png')} resizeMode="stretch" />
            </View>
            <Text style={styles.description} colorSecondary>
              {t('profile:text_about_description')}
            </Text>
          </Container>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = {
  full: {
    flex: 1,
  },
  textName: color => ({
    color: color,
    marginBottom: margin.big,
  }),
  viewImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margin.big,
  },
  description: {
    marginVertical: margin.base,
    lineHeight: lineHeights.h4,
  },
};
