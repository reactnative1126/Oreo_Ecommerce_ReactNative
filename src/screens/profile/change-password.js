import React from 'react';
import {connect} from 'react-redux';

import {StyleSheet, ScrollView, View} from 'react-native';
import {Header, Text, ThemedView} from 'src/components';
import Input from 'src/containers/input/Input';
import Container from 'src/containers/Container';
import Button from 'src/containers/Button';
import TextHtml from 'src/containers/TextHtml';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';

import {changePassword} from 'src/modules/auth/actions';
import {authSelector} from 'src/modules/auth/selectors';

import {margin} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';

import {changeColor} from 'src/utils/text-html';

class ChangePasswordScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      password_old: '',
      password_new: '',
      password_confirm: '',
    };
  }
  handleChangePassword = () => {
    this.props.dispatch(changePassword(this.state));
  };

  render() {
    const {
      auth: {pendingChangePassword, changePasswordError},
      screenProps: {t, theme},
    } = this.props;
    const {password_old, password_new, password_confirm} = this.state;

    const {message, errors} = changePasswordError;

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_password')} />}
          rightComponent={<CartIcon />}
        />
        <ScrollView>
          <Container>
            {message ? <TextHtml value={message} style={changeColor(theme.colors.error)} /> : null}
            <View style={styles.marginBig}>
              <Input
                label={t('profile:text_input_old_pass')}
                value={password_old}
                onChangeText={value => this.setState({password_old: value})}
                secureTextEntry
                error={errors && errors.password_old}
              />
              <Input
                label={t('profile:text_input_new_pass')}
                value={password_new}
                onChangeText={value => this.setState({password_new: value})}
                secureTextEntry
                error={errors && errors.password_new}
              />
              <Input
                label={t('profile:text_input_confirm_pass')}
                value={password_confirm}
                onChangeText={value => this.setState({password_confirm: value})}
                secureTextEntry
                error={errors && errors.password_confirm}
              />
            </View>
            <Text colorSecondary style={[styles.marginBig, styles.description]}>
              {t('profile:text_password_description')}
            </Text>
            <Button
              title={t('profile:text_button_password')}
              containerStyle={styles.marginBig}
              onPress={this.handleChangePassword}
              loading={pendingChangePassword}
            />
          </Container>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marginBig: {
    marginBottom: margin.big,
  },
  description: {
    lineHeight: lineHeights.h4,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
  };
};

export default connect(mapStateToProps)(ChangePasswordScreen);
