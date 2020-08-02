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
import {signInWithMobile, signInWithOtp, signUpWithOtp} from 'src/modules/auth/actions';

import {showMessage} from 'react-native-flash-message';

import {margin} from 'src/components/config/spacing';
import {changeColor} from 'src/utils/text-html';
import {checkPhoneNumber, digitsSendOtp} from 'src/modules/auth/service';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';

class LoginMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      phone_number: '989222330',
      country_no: '+84',
      visibleModal: false,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
    };
  }

  /**
   * Do login SMS
   * @param verify
   * @returns {Promise<void>}
   */
  handleLogin = async (otp) => {
    try {
      if (otp) {
        this.setState({
          loading: false,
          visibleModal: false,
        });
        // const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
        // this.props.dispatch(signInWithMobile(idTokenResult.token));

        const { country_no, phone_number } = this.state;

        const data = {
          countrycode: country_no,
          user: phone_number.replace(country_no, ''),
          otp,
        };

        this.props.dispatch(signInWithOtp(data));

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
      const {phone_number, country_no} = this.state;

      if (country_no && phone_number) {

        this.setState({
          loading: true,
        });

        const dataRequest = {
          countrycode: country_no,
          mobileNo: phone_number.replace(country_no, ''),
          type: 'login',
          whatsapp: 0,
        };
        const { code, ...rest } = await digitsSendOtp(dataRequest);

        if (code === 1 || code === '1') {
          this.setState({
            visibleModal: true
          });
        } else {
          this.setState({
            loading: false,
          });
        }

      } else {
        console.log('error');
        this.setState({
          loading: false,
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
    } = this.state;
    const {message, errors} = error;
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
          visible={visibleModal}
          handleVerify={this.handleLogin}
          setModalVisible={visibleModal =>
            this.setState({
              visibleModal,
              loading: false,
            })
          }
          data={{
            countrycode: country_no,
            mobileNo: phone_number.replace(country_no, ''),
            type: 'login',
            whatsapp: 0,
          }}
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
