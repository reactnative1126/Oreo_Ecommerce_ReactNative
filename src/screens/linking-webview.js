import React from 'react';
import {WebView} from 'react-native-webview';
import {ThemedView, Header} from 'src/components';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';

class LinkingWebview extends React.Component {
  render() {
    const {screenProps: {t}} = this.props;
    const url = this.props.navigation.getParam('url', '');
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_link_webview')} />}
        />
        {url ? (
          <WebView
            source={{uri: url}}
            style={{backgroundColor: 'transparent'}}
          />
        ) : null}
      </ThemedView>
    );
  }
}

export default LinkingWebview;
