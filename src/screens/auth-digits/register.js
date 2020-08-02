import React from 'react';

import {connect} from 'react-redux';
import omit from 'lodash/omit';
import assign from 'lodash/assign';
import firebase from '@react-native-firebase/app';

import {
  StyleSheet,
  ScrollView,
  View,
  Switch,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {Header, Loading, Text, ThemedView} from 'src/components';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import InputMobile from 'src/containers/input/InputMobile';
import Button from 'src/containers/Button';
import TextHtml from 'src/containers/TextHtml';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import ModalVerify from './containers/ModalVerify';
import SocialMethods from './containers/SocialMethods';

import {signUpWithEmail, signUpWithOtp} from 'src/modules/auth/actions';
import {authSelector} from 'src/modules/auth/selectors';
import {validatorRegister} from 'src/modules/auth/validator';
import {configsSelector, languageSelector} from 'src/modules/common/selectors';
import {checkPhoneNumber, checkInfo, digitsSendOtp, sendOtp, digitsLogoutUser} from 'src/modules/auth/service';

import {authStack} from 'src/config/navigator';
import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';
import {changeColor} from 'src/utils/text-html';
import {showMessage} from 'react-native-flash-message';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        first_name: '',
        last_name: '',
        name: '',
        email: '',
        password: '',
        phone_number: '',
        country_no: '',
        subscribe: false,
      },
      visibleModal: false,
      loading: false,
      error: {
        message: null,
        errors: null,
      },
    };
  }

  async componentDidMount() {
    await digitsLogoutUser();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  changeData = value => {
    this.setState({
      data: {
        ...this.state.data,
        ...value,
      },
    });
  };

  register = (otp) => {
    const {data} = this.state;
    this.setState({ visibleModal: false, loading: false });
    if (!otp) {
      this.props.dispatch(signUpWithEmail(data));
    } else {
      const {
        email,
        first_name,
        last_name,
        name,
        phone_number,
        country_no,
        password,
        subscribe,
      } = data;
      this.props.dispatch(signUpWithOtp({
        digits_reg_displayname: `${first_name} ${last_name}`,
        digits_reg_countrycode: country_no,
        digits_reg_mobile: phone_number.replace(country_no, ''),
        digits_reg_password: password,
        digits_reg_username: name,
        digits_reg_name: first_name,
        digits_reg_email: email,
        otp,
      }));
    }
  };

  /**
   * Handle User register
   */
  handleRegister = async () => {
    this.setState({
      loading: true,
    });
    try {
      const {
        enablePhoneNumber,
      } = this.props;
      // Register with phone number
      if (enablePhoneNumber) {
        const { data } = this.state;
        if (data.country_no && data.phone_number) {
          const dataRequest = {
            countrycode: data.country_no,
            mobileNo: data.phone_number.replace(data.country_no, ''),
            type: 'register',
            whatsapp: 0,
          };
          const { code, ...rest } = await digitsSendOtp(dataRequest);

          if (code === 1 || code === '1') {
            this.setState({
              visibleModal: true
            });
          } else {
            console.log(rest);
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
      } else {
        // this.register(false);
      }
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'danger',
      });
    }
  };

  render() {
    const {
      navigation,
      auth: {pending},
      screenProps: {t, theme},
      enablePhoneNumber,
    } = this.props;
    const {
      data: {
        email,
        first_name,
        last_name,
        name,
        phone_number,
        country_no,
        password,
        subscribe,
      },
      error: {message, errors},
      visibleModal,
      loading,
    } = this.state;
    return (
      <ThemedView isFullView>
        <Loading visible={pending} />
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_register')} />}
        />
        <KeyboardAvoidingView
          behavior="height"
          style={styles.keyboard}
          // contentContainerStyle={{flex: 1}}
        >
          <ScrollView>
            <Container>
              {message ? (
                <TextHtml
                  value={message}
                  style={changeColor(theme.colors.error)}
                />
              ) : null}
              <Input
                label={t('auth:text_input_first_name')}
                value={first_name}
                onChangeText={value => this.changeData({first_name: value})}
                error={errors && errors.first_name}
              />
              <Input
                label={t('auth:text_input_last_name')}
                value={last_name}
                onChangeText={value => this.changeData({last_name: value})}
                error={errors && errors.last_name}
              />
              <Input
                label={t('auth:text_input_user')}
                value={name}
                onChangeText={value => this.changeData({name: value})}
                error={errors && errors.name}
              />
              {enablePhoneNumber ? (
                <InputMobile
                  value={phone_number}
                  initialCountry={INITIAL_COUNTRY}
                  onChangePhoneNumber={({value, code}) =>
                    this.changeData({phone_number: value, country_no: code})
                  }
                  error={errors && errors.phone_number}
                />
              ) : null}
              <Input
                label={t('auth:text_input_email')}
                value={email}
                onChangeText={value => this.changeData({email: value})}
                error={errors && errors.email}
              />
              <Input
                label={t('auth:text_input_password')}
                value={password}
                secureTextEntry
                onChangeText={value => this.changeData({password: value})}
                error={errors && errors.password}
              />
              <View style={styles.viewSwitch}>
                <Text style={styles.textSwitch} colorSecondary>
                  {t('auth:text_agree_register')}
                </Text>
                <Switch
                  value={subscribe}
                  onValueChange={value => this.changeData({subscribe: value})}
                />
              </View>
              <Button
                title={t('auth:text_register')}
                onPress={this.handleRegister}
                loading={loading || pending}
              />
              <SocialMethods style={styles.viewAccount} />
              <Text
                medium
                style={styles.textHaveAccount}
                onPress={() => navigation.navigate(authStack.login)}>
                {t('auth:text_already_account')}
              </Text>
              <ModalVerify
                visible={visibleModal}
                data={{
                  countrycode: country_no,
                  mobileNo: phone_number.replace(country_no, ''),
                  type: 'register',
                  whatsapp: 0,
                }}
                handleVerify={this.register}
                setModalVisible={visibleModal =>
                  this.setState({
                    visibleModal,
                    loading: false,
                    confirmResult: null,
                  })
                }
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  viewSwitch: {
    marginVertical: margin.big,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textSwitch: {
    flex: 1,
    lineHeight: lineHeights.h4,
    marginRight: margin.large,
  },
  viewAccount: {
    marginVertical: margin.big,
  },
  textHaveAccount: {
    paddingVertical: padding.small,
    marginTop: margin.base,
    marginBottom: margin.big,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  const configs = configsSelector(state);
  return {
    auth: authSelector(state),
    language: languageSelector(state),
    enablePhoneNumber: configs.get('toggleLoginSMS'),
  };
};

export default connect(mapStateToProps)(RegisterScreen);
