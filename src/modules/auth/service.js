import queryString from 'query-string';
import request from 'src/utils/fetch';

/**
 * API login with email and password
 * @param username
 * @param password
 * @returns {Promise<unknown>}
 */
export const loginWithEmail = ({ username, password }) =>
  request.post('/rnlab-app-control/v1/login', { username, password });

/**
 * Login with Firebase
 * @param idToken Firebase user id token
 * @returns {Promise<unknown>}
 */
export const loginWithMobile = idToken =>
  request.post('/rnlab-app-control/v1/login-otp', { idToken });

export const loginWithFacebook = token =>
  request.post('/rnlab-app-control/v1/facebook', { token });

export const loginWithGoogle = user =>
  request.post('/rnlab-app-control/v1/google', user);

export const loginWithApple = data =>
  request.post('/rnlab-app-control/v1/apple', data);

export const registerWithEmail = data =>
  request.post('/rnlab-app-control/v1/register', data);

export const forgotPassword = user_login =>
  request.post('/rnlab-app-control/v1/lost-password', { user_login });

export const changePassword = ({ password_old, password_new }) =>
  request.post('/rnlab-app-control/v1/change-password', {
    password_old,
    password_new,
  });

export const changeEmail = ({ u_password, u_email }) =>
  request.patch('users/change-email', { u_password, u_email });

export const updateCustomer = (user_id, data) =>
  request.put(`/rnlab-app-control/v1/customers/${user_id}`, data);

export const getCustomer = user_id =>
  request.get(`/wc/v3/customers/${user_id}`);

export const logout = () => request.get('users/logout');

export const isLogin = () => request.get('users/is-login');

export const checkPhoneNumber = data =>
  request.post('/rnlab-app-control/v1/check-phone-number', data);

export const checkInfo = data => request.post('/rnlab-app-control/v1/check-info', data);

// Digits API

export const digitsCreateUser = data => request.post('/digits/v1/create_user', queryString.stringify(data));

export const digitsLoginUser = data => request.post('/digits/v1/login_user', queryString.stringify(data));

export const digitsRecoveryUser = data => request.post('/digits/v1/recovery', queryString.stringify(data));

export const digitsLogoutUser = () => request.post('/digits/v1/logout');

export const digitsUpdatePhone = data => request.post('/digits/v1/update_phone', queryString.stringify(data));

export const digitsSendOtp = data => request.post('/digits/v1/send_otp', queryString.stringify(data));

export const sendOtp = data => request.post('/digits/v1/send_otp', queryString.stringify(data));

export const digitsReSendOtp = data => request.post('/digits/v1/resend_otp', queryString.stringify(data));

export const digitsVerifyOtp = data => request.post('/digits/v1/verify_otp', queryString.stringify(data));

export const getFilesDownload = user_id => request.get(`/wc/v3/customers/${user_id}/downloads`);