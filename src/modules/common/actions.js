// flow
import * as Actions from './constants';

/**
 * Action switch theme
 * @returns {{type: string}}
 */
export function switchMode() {
  return {
    type: Actions.SWITCH_MODE,
  };
}

/**
 * Action switch product view
 * @returns {{type: string}}
 */
export function switchProductView(view = Actions.PRODUCT_VIEW_STYLE_1) {
  return {
    type: Actions.SWITCH_PRODUCT_VIEW,
    payload: view,
  };
}

/**
 * Action change currency
 * @param code
 * @returns {{type: string, payload: *}}
 */
export function changeCurrency(code: string) {
  return {
    type: Actions.CHANGE_CURRENCY,
    payload: code,
  };
}

/**
 * Action change language
 * @param code
 * @returns {{type: string, payload: string}}
 */
export function changeLanguage(code: string) {
  return {
    type: Actions.CHANGE_LANGUAGE,
    payload: code,
  };
}

/**
 * Action change template
 * @param code
 * @returns {{type: string, payload: string}}
 */
export function changeTemplate(active) {
  return {
    type: Actions.CHANGE_TEMPLATE,
    payload: active,
  };
}

/**
 * Action add wish list
 * @param product_id: number
 * @returns {{type: string, payload: {product_id: number}}}
 */
export function addWishList(product_id: number): Action {
  return {
    type: Actions.ADD_WISHLIST,
    payload: {
      product_id,
    },
  };
}

/**
 * Action remove wish list
 * @param product_id: number
 * @returns {{type: string, payload: {product_id: number}}}
 */
export function removeWishList(product_id: number): Action {
  return {
    type: Actions.REMOVE_WISHLIST,
    payload: {
      product_id,
    },
  };
}

/**
 * Fetch countries
 * @returns {{type: string}}
 */
export function fetchCountries() {
  return {
    type: Actions.FETCH_COUNTRY,
  };
}

/**
 * Fetch payment gateways
 * @returns {{type: string}}
 */
export function fetchPaymentGateways() {
  return {
    type: Actions.FETCH_PAYMENT_GATEWAYS,
  };
}

/**
 * Fetch shipping method not covered by zones
 * @returns {{type: string}}
 */
export function fetchShippingMethodsNotCoveredByZone() {
  return {
    type: Actions.FETCH_SHIPPING_METHOD_NOT_COVER_BY_ZONE,
  };
}

/**
 * Fetch settings success
 * @param settings
 * @param configSetting
 * @param configs
 * @returns {{type: string, payload: {settings: *, configSetting: *, configs: *}}}
 */
export function fetchSettingSuccess({settings, configs, templates}) {
  return {
    type: Actions.FETCH_SETTING_SUCCESS,
    payload: {
      settings,
      configs,
      templates,
    },
  }
}

/**
 * Close Getting Stated
 * @returns {{type: string}}
 */
export function closeGettingStarted() {
  return {
    type: Actions.CLOSE_GETTING_STARTED,
  }
}
