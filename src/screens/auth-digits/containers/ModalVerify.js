import React from 'react';
import {withTranslation} from 'react-i18next';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
// import isMobilePhone from 'validator/lib/isMobilePhone';

import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Modal, Text} from 'src/components';
import Container from 'src/containers/Container';
import InputCode from 'src/containers/input/InputCode';
import Button from 'src/containers/Button';

import {green} from 'src/components/config/colors';
import {margin} from 'src/components/config/spacing';
import {digitsVerifyOtp} from '../../../modules/auth/service';

const number_code = 6;

class ModalVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      loading: false,
      loadingResend: false,
      confirmation: props.confirmation,
    };
  }

  clickVerifyOtp = () => {
    const {t} = this.props;
    const {code} = this.state;
    if (code.length < 6) {
      showMessage({
        message: t('auth:text_fill_verify_otp'),
        type: 'danger',
        duration: 3000,
      });
    } else {
      this.verifyOtp(code);
    }
  };

  verifyOtp = async otp => {
    try {
      this.setState({loading: true});

      // validate firebase auth
      const {handleVerify, data} = this.props;
      const postData = {
        ...data, otp
      };
      console.log(postData);
      const { code, message } = await digitsVerifyOtp(postData);

      if (code === 1 || code === '1') {
        this.setState({loading: false}, () => handleVerify(otp));
      } else {
        this.setState({loading: false});
        showMessage({
          message: message,
          type: 'danger',
          duration: 3000,
        });
      }

    } catch (e) {
      this.setState({loading: false});
      showMessage({
        message: e.message,
        type: 'danger',
        duration: 3000,
      });
    }
  };

  resendOtp = async () => {
    try {
      this.setState({
        loadingResend: true,
      });

      const {phone} = this.props;
      if (phone) {
        const confirmation = await auth().signInWithPhoneNumber(phone);
        if (confirmation && confirmation._verificationId) {
          this.setState({
            confirmation,
            loadingResend: false,
          });
          showMessage({
            message: 'Resend successfully',
            type: 'success',
            duration: 3000,
          });
        } else {
          this.setState({
            loadingResend: false,
          });
          showMessage({
            message: 'Something wrong.',
            type: 'danger',
          });
        }
      } else {
        this.setState({
          loadingResend: false,
        });
        showMessage({
          message: 'Check phone number ',
          type: 'danger',
          duration: 3000,
        });
      }
    } catch (e) {
      this.setState({
        loadingResend: false,
      });
      showMessage({
        message: e.message,
        type: 'danger',
        duration: 3000,
      });
    }
  };

  componentDidUpdate(prevProps) {
    // const { confirmation } = this.props;
    // if (confirmation && confirmation != prevProps.confirmation) {
    //   this.setState({
    //     confirmation: this.props.confirmation
    //   });
    // }
  }

  render() {
    const {loading, loadingResend} = this.state;
    const {visible, setModalVisible, t} = this.props;

    return (
      <Modal
        visible={visible}
        setModalVisible={setModalVisible}
        ratioHeight={0.7}
        topRightElement={
          <Text style={styles.textHeader} medium h4>
            {t('auth:text_title_verify')}
          </Text>
        }>
        <KeyboardAvoidingView behavior={'padding'}>
          <ScrollView>
            <Container style={styles.viewContent}>
              <InputCode
                codeLength={number_code}
                containerStyle={styles.input}
                onCodeChange={value => this.setState({code: value})}
                onFulfill={otp => this.verifyOtp(otp)}
                editable={!loadingResend}
              />
              {/*<Text medium style={styles.textOtp} onPress={this.resendOtp}>*/}
              {/*  {t('auth:text_resend_otp')}*/}
              {/*</Text>*/}
              {loadingResend && (
                <ActivityIndicator
                  size={'small'}
                  style={styles.loadingResend}
                />
              )}
              <Button
                loading={loading}
                title={t('auth:text_button_verify')}
                onPress={this.clickVerifyOtp}
                disabled={loadingResend}
                containerStyle={styles.button}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textHeader: {
    flex: 1,
    textAlign: 'center',
  },
  viewContent: {
    marginVertical: margin.big,
  },
  input: {
    marginBottom: margin.large,
  },
  textOtp: {
    textAlign: 'center',
    marginBottom: margin.big,
    color: green,
  },
  textSendOtp: {
    color: green,
    textTransform: 'uppercase',
  },
  loadingResend: {
    marginBottom: margin.big,
  },
  button: {
    marginTop: margin.big,
  },
});

ModalVerify.defaultProps = {
  visible: false,
  setModalVisible: () => {},
  handleVerify: () => {},
};

export default withTranslation()(ModalVerify);
