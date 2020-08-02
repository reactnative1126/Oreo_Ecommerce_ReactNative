import React from 'react';

import isObject from 'lodash/isObject';
import RNRestart from 'react-native-restart';
import {connect} from 'react-redux';

import {StyleSheet, ScrollView, KeyboardAvoidingView, Linking} from 'react-native';
import {Header, ThemedView, Text} from 'src/components';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import Container from 'src/containers/Container';
import {showMessage} from 'react-native-flash-message';

import {blue} from 'src/components/config/colors';
import {margin} from 'src/components/config/spacing';
import {getDemoSelector} from 'src/modules/common/selectors';

import {API, CONSUMER_SECRET, CONSUMER_KEY} from 'src/config/api';

class DemoConfig extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      url: '',
      consumer_key: '',
      consumer_secret: '',
      loading: false,
    }
  }

  handleSave = async () => {
    this.setState({loading: true});
    const {dispatch} = this.props;
    const {url, consumer_key, consumer_secret} = this.state;
    try {
      // Check WP website
      await fetch(url);
      const wp = await fetch(`${url}/wp-json`);

      // Check install plugin rnlab
      const rnlab = await fetch(`${url}/wp-json/rnlab-app-control/v1/settings`);

      // Check Woocommerce
      const woo = await fetch(`${url}/wp-json/wc/v3/products?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`);
      this.setState({loading: false});

      dispatch({
        type: 'UPDATE_DEMO_CONFIG_SUCCESS', payload: {
          url,
          consumer_key,
          consumer_secret,
        },
      });

      showMessage({
        message: 'Restating...',
        type: 'success',
      });

      setTimeout(() => RNRestart.Restart(), 2000);

    } catch (e) {
      this.setState({loading: false});
      showMessage({
        message: e.message,
        type: 'danger',
      });
    }
  };

  logoutStore = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'UPDATE_DEMO_CONFIG_SUCCESS', payload: {
        url: API,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    });

    showMessage({
      message: 'Restating...',
      type: 'success',
    });

    setTimeout(() => RNRestart.Restart(), 2000);
  };

  onChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const {demo} = this.props;
    const {url, consumer_key, consumer_secret, loading} = this.state;
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader/>}
          centerComponent={<TextHeader title={'Test Store'}/>}
        />
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <Container>
              <Text colorSecondary style={styles.textDescription}>
                You can test your Store. Please input here
              </Text>
              <Input value={url} label={'Domain URL'} onChangeText={value => this.onChange('url', value)}/>
              <Input value={consumer_key} label={'Consumer Key'}
                     onChangeText={value => this.onChange('consumer_key', value)}/>
              <Input value={consumer_secret} label={'Consumer Secret'}
                     onChangeText={value => this.onChange('consumer_secret', value)}/>
              <Text
                h6
                style={styles.textNote}
                onPress={() => Linking.openURL('https://doc-oreo.rnlab.io/docs/v1/web-config')}>
                How to get Consumer key and Consumer secret
              </Text>
              <Button
                loading={loading}
                title={'Connect Store'}
                containerStyle={styles.button}
                onPress={this.handleSave}
              />

              {demo.get('url') && demo.get('url') !== API ? (
                <Button
                  loading={loading}
                  title="Disconnect Store"
                  containerStyle={styles.button}
                  onPress={this.logoutStore}
                />
              ) : null}
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  textDescription: {
    marginVertical: margin.big,
  },
  textNote: {
    color: blue,
    marginTop: margin.base,
  },
  button: {
    marginVertical: margin.big + margin.base,
  },
});

const mapStateToProps = state => {
  return {
    demo: getDemoSelector(state),
  };
};

export default connect(mapStateToProps)(DemoConfig);
