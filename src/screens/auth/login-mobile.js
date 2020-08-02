import React from 'react';
import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';

import trim from 'lodash/trim';

import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Loading} from 'src/components';
import {ThemedView, Text, Header} from 'src/components';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import InputMobile from 'src/containers/input/InputMobile';
import Button from 'src/containers/Button';
import TextHtml from 'src/containers/TextHtml';

import ModalVerify from './containers/ModalVerify';

import {authSelector} from 'src/modules/auth/selectors';
import {languageSelector} from 'src/modules/common/selectors';
import {signInWithMobile} from 'src/modules/auth/actions';

import {showMessage} from 'react-native-flash-message';

import {margin} from 'src/components/config/spacing';
import {changeColor} from 'src/utils/text-html';
import {checkPhoneNumber} from 'src/modules/auth/service';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';

class LoginMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      phone_number: '',
      country_no: '',
      visibleModal: false,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
      confirmResult: null,
    };
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
        });
      }

      if (this.state.confirmResult && Platform.OS === 'android') {
        this.handleLogin(true);
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Do login SMS
   * @param verify
   * @returns {Promise<void>}
   */
  handleLogin = async verify => {
    try {
      if (verify) {
        this.setState({
          visibleModal: false,
        });
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        this.props.dispatch(signInWithMobile(idTokenResult.token));
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'danger',
      });
    }
  };

  /**
   * Handle login mobile
   * @returns {Promise<void>}
   */
  clickLogin = async () => {
    try {
      const {phone_number, country_no, user} = this.state;

      // Get user phone number
      const user_phone_number = phone_number.includes(country_no)
        ? phone_number
        : country_no + phone_number;

      this.setState({
        loading: true,
      });

      // Check phone number on database
      await checkPhoneNumber({
        digits_phone: user_phone_number,
        type: 'login',
      });

      // For device auto verify
      if (user) {
        this.handleLogin(true);
        this.setState({
          loading: false,
        });
      } else {
        // Send Verify token
        const confirmResult = await firebase.auth().signInWithPhoneNumber(
            user_phone_number,
        );
        this.setState({
          loading: false,
          confirmResult,
        });
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'danger',
      });
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      screenProps: {t, theme},
      auth: {pendingMobile},
    } = this.props;
    const {
      phone_number,
      country_no,
      error,
      loading,
      visibleModal,
      user,
      confirmResult,
    } = this.state;
    const {message, errors} = error;
    const visible = visibleModal || !!(!user && confirmResult);
    return (
      <ThemedView isFullView>
        <Loading visible={pendingMobile} />
        <Header
          leftComponent={<IconHeader />}
          centerComponent={
            <TextHeader title={t('common:text_signin_mobile')} />
          }
        />
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <Container style={styles.content}>
              <Text style={styles.description} colorSecondary>
                {t('auth:text_description_login_mobile')}
              </Text>
              {message ? (
                <TextHtml
                  value={message}
                  style={changeColor(theme.colors.error)}
                />
              ) : null}
              <InputMobile
                value={phone_number}
                initialCountry={INITIAL_COUNTRY}
                onChangePhoneNumber={({value, code}) =>
                  this.setState({phone_number: trim(value), country_no: code})
                }
                error={errors && errors.phone_number}
              />
              <Button
                title={t('common:text_signin')}
                containerStyle={styles.button}
                loading={loading || pendingMobile}
                onPress={this.clickLogin}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
        <ModalVerify
          visible={visible}
          confirmation={confirmResult}
          handleVerify={this.handleLogin}
          setModalVisible={visibleModal =>
            this.setState({
              visibleModal,
              loading: false,
              confirmResult: null,
            })
          }
          phone={
            phone_number.includes(country_no)
              ? phone_number
              : country_no + phone_number
          }
        />
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginTop: margin.base,
  },
  description: {
    marginBottom: margin.large,
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

export default connect(mapStateToProps)(LoginMobile);
