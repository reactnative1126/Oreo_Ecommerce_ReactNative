import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Header, Text, ThemedView} from 'src/components';
import Container from 'src/containers/Container';
import TextHtml from 'src/containers/TextHtml';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';

import {forgotPassword} from 'src/modules/auth/actions';
import {authSelector} from 'src/modules/auth/selectors';

import {margin} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';

import {changeColor} from 'src/utils/text-html';

class ForgotScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleSubmit = () => {
    this.props.dispatch(forgotPassword(this.state.email));
  };

  render() {
    const {
      auth: {pendingForgotPassword, forgotPasswordError},
      screenProps: {t, theme},
    } = this.props;

    const {email} = this.state;
    const {message, errors} = forgotPasswordError;

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_forgot')} />}
        />
        <ScrollView>
          <KeyboardAvoidingView>
            <Container>
              <Text style={styles.description} colorSecondary>
                {t('auth:text_description_forgot')}
              </Text>
              {message ? <TextHtml value={message} style={changeColor(theme.colors.error)} /> : null}
              <Input
                label={t('auth:text_input_email')}
                value={email}
                onChangeText={value => this.setState({email: value})}
                error={errors && errors.email}
              />
              <Button
                title={t('common:text_submit')}
                containerStyle={styles.margin}
                loading={pendingForgotPassword}
                onPress={this.handleSubmit}
              />
            </Container>
          </KeyboardAvoidingView>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    lineHeight: lineHeights.h4,
    marginBottom: margin.big - margin.base,
  },
  margin: {
    marginVertical: margin.big,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
  };
};

export default connect(mapStateToProps)(ForgotScreen);
