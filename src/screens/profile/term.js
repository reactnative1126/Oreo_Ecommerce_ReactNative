import React, { Component } from 'react';

import { Header, ThemedView } from 'src/components';

import { IconHeader, CartIcon, TextHeader } from 'src/containers/HeaderComponent';
import ContainerTerm from './containers/ContainerTerm';

export default class TermScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    const {
      screenProps: { t },
    } = this.props;
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('profile:text_term')} />}
          rightComponent={<CartIcon />}
        />
        <ContainerTerm />
      </ThemedView>
    );
  }
}
