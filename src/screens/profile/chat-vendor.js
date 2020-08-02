import React from 'react';
import {Header, ThemedView} from 'src/components';
import {CartIcon, IconHeader, TextHeader} from 'src/containers/HeaderComponent';
import Chat from './vendor/Chat';

class ChatVendor extends React.Component {
  render() {
    const {navigation} = this.props;

    const store = navigation.getParam('store', {});
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={store.name} />}
        />
        <Chat />
      </ThemedView>
    );
  }
}

export default ChatVendor;
