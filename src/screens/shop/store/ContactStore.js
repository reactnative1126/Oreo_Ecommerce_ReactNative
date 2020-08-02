import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Text} from 'src/components';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import TextHtml from 'src/containers/TextHtml';

import {sendContactVendorId} from 'src/modules/vendor/service';
import {validatorContact} from 'src/modules/vendor/validator';
import {languageSelector} from 'src/modules/common/selectors';
import {authSelector} from 'src/modules/auth/selectors';

import {margin} from 'src/components/config/spacing';

import {changeColor} from 'src/utils/text-html';
import {showMessage} from 'react-native-flash-message';

class ContactStore extends React.Component {
  constructor(props) {
    super(props);
    const {auth: {user}} = props;
    this.state = {
      name: user && user.display_name ? user.display_name: '',
      email: user && user.user_email ? user.user_email : '',
      message: '',
      loading: false,
      error: {
        message: null,
        errors: null,
      },
    };
  }
  clickSend = () => {
    const {language, t} = this.props;
    const {name, email, message} = this.state;
    const errors = validatorContact(
      {
        name,
        email,
        message,
      },
      language,
    );
    if (errors.size) {
      this.setState({
        error: {
          message: t('notifications:text_fill_value'),
          errors: errors.toJS(),
        },
      });
    } else {
      this.setState(
        {
          loading: true,
          error: {
            message: null,
            errors: null,
          },
        },
        this.sendContact,
      );
    }
  };
  sendContact = async () => {
    try {
      const {store} = this.props;
      const {name, email, message} = this.state;
      await sendContactVendorId(store.id, {
        name,
        email,
        message,
      });
      this.setState({
        loading: false,
      });
      showMessage({
        message: 'Send success',
        type: 'success',
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: {
          message: e.message,
          errors: null,
        },
      });
    }
  };
  render() {
    const {screenProps: {theme, t}} = this.props;
    const {name, email, message, loading, error} = this.state;
    const {message: messageError, errors} = error;

    return (
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
        <ScrollView>
          <Container>
            <Text h4 medium style={styles.title}>
              {t('catalog:text_title_contact_store')}
            </Text>
            {messageError ? <TextHtml value={messageError} style={changeColor(theme.colors.error)} paragraphBreak={'\n'}/> : null}
            <Input
              label={t('inputs:text_your_name')}
              value={name}
              onChangeText={value => this.setState({name: value})}
              error={errors && errors.name}
            />
            <Input
              label={t('inputs:text_your_email')}
              value={email}
              onChangeText={value => this.setState({email: value})}
              error={errors && errors.email}
            />
            <Input
              label={t('inputs:text_your_message')}
              multiline
              numberOfLines={7}
              value={message}
              onChangeText={value => this.setState({message: value})}
              error={errors && errors.message}
            />
            <Button
              title={t('catalog:text_button_contact_store')}
              containerStyle={styles.button}
              loading={loading}
              onPress={this.clickSend}
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  title: {
    marginBottom: margin.small,
  },
  button: {
    marginVertical: margin.big,
  },
});

const mapStateToProps = state => {
  return {
    auth: authSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(ContactStore);
