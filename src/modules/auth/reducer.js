import { fromJS } from 'immutable';

import { REHYDRATE } from 'redux-persist/lib/constants';
import * as Actions from './constants';
import { notificationMessage } from 'src/utils/error';
import { shippingAddressInit, errorInit as initError } from './config';

const initState = fromJS({
  isLogin: false,
  pending: false,
  pendingMobile: false,
  pendingGoogle: false,
  pendingFacebook: false,
  pendingApple: false,
  user: {},
  token: '',
  shippingAddress: shippingAddressInit,
  loginError: initError,
  signUpError: initError,
  changeMailError: {
    message: '',
    errors: {},
  },
  changePasswordError: initError,
  forgotPasswordError: initError,
  updateShippingAddressError: initError,
  pendingChangeEmail: false,
  pendingChangePassword: false,
  pendingForgotPassword: false,
  pendingUpdateCustomer: false,
  files: {
    data: [],
    loading: true,
    error: true,
    refreshing: false,
  },
});

export default function authReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.SIGN_IN_WITH_EMAIL:
      return state.set('pending', true).set('loginError', fromJS(initError));
    case Actions.SIGN_IN_WITH_EMAIL_SUCCESS:
      return state
        .set('pending', false)
        .set('user', fromJS(action.payload.user))
        .set('isLogin', true)
        .set('token', fromJS(action.payload.token))
        .set('pendingMobile', false)
        .set('pendingFacebook', false)
        .set('pendingFacebook', false)
        .set('pendingApple', false);
    case Actions.SIGN_IN_WITH_EMAIL_ERROR:
      const errorSignIn = notificationMessage(action.payload);
      return state.set('pending', false).set('loginError', fromJS(errorSignIn));
    case Actions.SIGN_IN_WITH_MOBILE:
      return state.set('pendingMobile', true);
    case Actions.SIGN_IN_WITH_MOBILE_ERROR:
      return state.set('pendingMobile', false);
    case Actions.SIGN_IN_WITH_GOOGLE:
      return state.set('pendingGoogle', true);
    case Actions.SIGN_IN_WITH_GOOGLE_ERROR:
    case Actions.SIGN_IN_WITH_GOOGLE_CANCEL:
      return state.set('pendingGoogle', false);
    case Actions.SIGN_IN_WITH_APPLE:
      return state.set('pendingApple', true);
    case Actions.SIGN_IN_WITH_FACEBOOK:
      return state.set('pendingFacebook', true);
    case Actions.SIGN_IN_WITH_FACEBOOK_ERROR:
    case Actions.SIGN_IN_WITH_FACEBOOK_CANCEL:
      return state.set('pendingFacebook', false);
    case Actions.SIGN_IN_WITH_APPLE_ERROR:
    case Actions.SIGN_IN_WITH_APPLE_CANCEL:
      return state.set('pendingApple', false);
    case Actions.SIGN_UP_WITH_EMAIL:
      return state.set('pending', true).set('signUpError', fromJS(initError));
    case Actions.SIGN_UP_WITH_EMAIL_SUCCESS:
      return state.set('pending', false);
    case Actions.SIGN_UP_WITH_EMAIL_ERROR:
      const errorSignUp = notificationMessage(action.payload);
      return state
        .set('pending', false)
        .set('signUpError', fromJS(errorSignUp));

    case Actions.SIGN_OUT_SUCCESS:
      return initState;
    case Actions.CHANGE_EMAIL:
      return state.set('pendingChangeEmail', true).set('changeMailError', {
        message: '',
        errors: {},
      });
    case Actions.CHANGE_EMAIL_SUCCESS:
      return state.set('pendingChangeEmail', false);
    case Actions.CHANGE_PASSWORD:
      return state
        .set('pendingChangePassword', true)
        .set('changePasswordError', fromJS(initError));
    case Actions.CHANGE_PASSWORD_SUCCESS:
      return state.set('pendingChangePassword', false);
    case Actions.CHANGE_PASSWORD_ERROR:
      const errorChangePass = notificationMessage(action.payload);
      return state
        .set('pendingChangePassword', false)
        .set('changePasswordError', fromJS(errorChangePass));

    case Actions.CHANGE_EMAIL_ERROR:
      return state.set('pendingChangePassword', false);

    case Actions.FORGOT_PASSWORD:
      return state
        .set('pendingForgotPassword', true)
        .set('forgotPasswordError', fromJS(initError));

    case Actions.FORGOT_PASSWORD_SUCCESS:
      return state.set('pendingForgotPassword', false);
    case Actions.FORGOT_PASSWORD_ERROR:
      const errorForgotPass = notificationMessage(action.payload);
      return state
        .set('pendingForgotPassword', false)
        .set('forgotPasswordError', fromJS(errorForgotPass));

    case Actions.GET_SHIPPING_ADDRESS_SUCCESS:
    case Actions.GET_SHIPPING_ADDRESS_ERROR:
      return state.set('shippingAddress', fromJS(action.payload));
    case Actions.UPDATE_CUSTOMER:
      return state.set('pendingUpdateCustomer', true);

    case Actions.UPDATE_CUSTOMER_SUCCESS:
    case Actions.UPDATE_CUSTOMER_ERROR:
      return state.set('pendingUpdateCustomer', false);
    case Actions.UPDATE_USER_SUCCESS:
      const userOld = state.get('user');
      const user = {
        ...userOld.toJS(),
        ...action.payload,
      };
      return state.set('user', fromJS(user));
    case Actions.UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return state.set('shippingAddress', fromJS(action.payload));
    case REHYDRATE:
      if (action.payload && action.payload.auth) {
        // Restore only user and isLogin state
        const { auth } = action.payload;
        return initState.merge(
          fromJS({
            user: auth.get('user'),
            token: auth.get('token'),
            isLogin: auth.get('isLogin'),
            shippingAddress:
              auth.get('shippingAddress') || fromJS(shippingAddressInit),
          }),
        );
      } else {
        return state;
      }
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState;
    case Actions.GET_LIST_FILE_DOWNLOAD:
      return state.set('files', {
        data: [],
        loading: true,
        error: true,
        refreshing: false,
      });
    case Actions.GET_LIST_FILE_DOWNLOAD_SUCCESS:
      return state.set('files', {
        data: fromJS(action.payload),
        loading: false,
        error: false,
        refreshing: false,
      });
    case Actions.GET_LIST_FILE_DOWNLOAD_ERROR:
      return state.set('files', {
        data: [],
        loading: false,
        error: false,
        refreshing: false,
      });
    default:
      return state;
  }
}
