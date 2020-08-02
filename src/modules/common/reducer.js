import {fromJS, List, Set, Map} from 'immutable';
import moment from 'moment';
import * as Actions from './constants';
import {REHYDRATE} from 'redux-persist/lib/constants';
import apiConfig from 'src/config/api';
import {DEFAULT_LANGUAGE_CODE} from './constants';
import i18n from '../../config-i18n';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

const siteConfig = {
  timezone_string: 'Asia/Karachi',
  date_format: 'F j, Y',
  time_format: 'g:i a',
};

const initConfigs = {
  requireLogin: false,
  toggleSidebar: true,
  isBeforeNewProduct: 5,
  toggleCheckout: true,
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  pinterest: 'https://www.pinterest.com/',
  twitter: 'https://twitter.com/',
  phone: '0123 456 789',
  email: 'youremail@gmail.com',
  address: '123456, your store address',
  toggleLoginGoogle: true,
  toggleLoginFacebook: true,
  toggleLoginSMS: true,
  webviewCheckout: true,
  toggleWishlist: true,
  copyright: '© 2020 RNLAB',
  toggleRatingProduct: true,
  toggleShortDescriptionProduct: true,
  toggleReviewProduct: true,
  toggleAddButtonProduct: true,
  policy: {},
  term: {},
  about: {},
};

export const initState = fromJS({
  theme: Actions.LIGHT,
  currency: null,
  defaultCurrency: Actions.DEFAULT_CURRENCY,
  currencies: [],
  defaultLanguage: Actions.DEFAULT_LANGUAGE_CODE,
  language: null,
  languages: [],
  templates: List(), // all template
  templateActive: null,
  configs: fromJS(initConfigs),
  wishList: Set(),
  productView: Actions.PRODUCT_VIEW_STYLE_1,
  country: {
    data: [],
    loading: false,
    expire: '',
  },
  paymentGateways: {
    data: [],
    loading: false,
  },
  methodsNotCoveredByZone: {
    data: [],
    loading: false,
  },
  isGettingStarted: true,
  demo: {
    url: apiConfig.API_ENDPOINT,
    consumer_key: apiConfig.CONSUMER_KEY,
    consumer_secret: apiConfig.CONSUMER_SECRET
  },
  siteConfig
});

/**
 * Common reducer
 * @param state
 * @param action
 * @returns {*}
 */
function commonReducer(state = initState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    // Setting
    case Actions.SWITCH_MODE:
      return state.set('theme', state.get('theme') === Actions.LIGHT ? Actions.DARK : Actions.LIGHT);
    case Actions.FETCH_SETTING_SUCCESS:
      const defaultCurrency = payload.settings.currency;
      const defaultLanguage = payload.settings.language;

      // Check currency in list currency
      const isCurrencyValidate = payload.settings.currencies && state.get('currency') && payload.settings.currencies[state.get('currency')];

      return state
        .merge(fromJS(payload.settings))
        .set('siteConfig', fromJS(payload.settings))
        .set('theme', state.get('theme'))
        .set('currency', isCurrencyValidate ? state.get('currency') : defaultCurrency)
        .set('defaultCurrency', defaultCurrency)
        .set('language', state.get('language') || defaultLanguage)
        .set('defaultLanguage', defaultLanguage)
        .set('templates', fromJS(payload.templates))
        .set('configs', fromJS({
          ...initConfigs,
          ...payload.configs,
        }));
    case Actions.CHANGE_TEMPLATE:
      return state.set('templateActive', payload);
    case Actions.CHANGE_CURRENCY:
      return state.set('currency', payload);
    case Actions.CHANGE_LANGUAGE:
      return state.set('language', payload);
    // Country
    case Actions.FETCH_COUNTRY:
      return state.setIn(['country', 'loading'], true);
    case Actions.FETCH_COUNTRY_SUCCESS:
      return state
        .setIn(['country', 'data'], fromJS(payload))
        .setIn(['country', 'loading'], false)
        .setIn(
          ['country', 'expire'],
          moment()
            .add(10, 'days')
            .unix(),
        ); // 10 day expire
    case Actions.FETCH_COUNTRY_ERROR:
      return state.setIn(['country', 'loading'], false);

    // Payment Gateways
    case Actions.FETCH_PAYMENT_GATEWAYS:
      return state.setIn(['paymentGateways', 'loading'], true);
    case Actions.FETCH_PAYMENT_GATEWAYS_SUCCESS:
      return state.setIn(['paymentGateways', 'data'], fromJS(payload)).setIn(['paymentGateways', 'loading'], false);
    case Actions.FETCH_PAYMENT_GATEWAYS_ERROR:
      return state.setIn(['paymentGateways', 'loading'], false);

    // Shipping method not covered by zone
    case Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE:
      return state.setIn(['methodsNotCoveredByZone', 'loading'], true);
    case Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE_SUCCESS:
      return state
        .setIn(['methodsNotCoveredByZone', 'data'], fromJS(payload))
        .setIn(['methodsNotCoveredByZone', 'loading'], false);
    case Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE_ERROR:
      return state.setIn(['methodsNotCoveredByZone', 'loading'], false);

    // Wish list
    case Actions.ADD_WISHLIST:
      return state.update('wishList', data => data.add(payload.product_id));
    case Actions.REMOVE_WISHLIST:
      return state.update('wishList', data => data.remove(payload.product_id));

    // Product view
    case Actions.SWITCH_PRODUCT_VIEW:
      return state.set('productView', payload);

    // Close getting started
    case Actions.CLOSE_GETTING_STARTED:
      return state.set('isGettingStarted', false);

    case REHYDRATE:
      const data = payload && payload.common ? payload.common : Map();
      const prepareData  = initState.merge(data);
      const language = prepareData.get('language') ? prepareData.get('language') : DEFAULT_LANGUAGE_CODE;
      reloadApp(language);
      return prepareData;
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState.set('demo', fromJS(payload));
    default:
      return state;
  }
}

function reloadApp(language) {
  const isRTL = i18n.dir(language) === 'rtl';
  I18nManager.forceRTL(isRTL);
  // Reload
  if (isRTL !== I18nManager.isRTL) {
    RNRestart.Restart();
    // Updates.reloadFromCache(); // For expo
  }
}

export default commonReducer;
