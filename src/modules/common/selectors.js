import forEach from 'lodash/forEach';
import {fromJS, Map} from 'immutable';
import {createSelector} from 'reselect';
import * as Actions from './constants';
import {isLoginSelector} from 'src/modules/auth/selectors';
import {categoryListType} from 'src/config/category';
import {imagesTheme} from 'src/config/images';
import {rootSwitch} from 'src/config/navigator';

export const rootCommon = state => state.common;

export const toggleSidebarSelector = createSelector(
  rootCommon,
  data => data.getIn(['configs', 'toggleSidebar']) || false,
);

export const requiredLoginSelector = createSelector(
  rootCommon,
  data => data.getIn(['configs', 'requireLogin']) || false,
);

export const daysBeforeNewProductSelector = createSelector(
  rootCommon,
  data => data.getIn(['configs', 'isBeforeNewProduct']) || 5,
);

export const configsSelector = createSelector(
  rootCommon,
  data => data.get('configs'),
);

export const getSiteConfig = createSelector(
    rootCommon,
    data => data.get('siteConfig'),
);

export const isGettingStartSelector = createSelector(
  rootCommon,
  data => data.get('isGettingStarted'),
);

export const wishListSelector = createSelector(
  rootCommon,
  data => data.get('wishList'),
);

export const countrySelector = createSelector(
  rootCommon,
  data => data.get('country'),
);

export const paymentGatewaysSelector = createSelector(
  rootCommon,
  data => data.get('paymentGateways'),
);

export const shippingMethodNotCoveredByZoneSelector = createSelector(
  rootCommon,
  data => data.get('methodsNotCoveredByZone'),
);

// Select active currency
export const currencySelector = createSelector(
  rootCommon,
  data => data.get('currency') || Actions.DEFAULT_CURRENCY,
);

// Select list currency
export const listCurrencySelector = createSelector(
  rootCommon,
  data => data.get('currencies'),
);

// select default currency
export const defaultCurrencySelector = createSelector(
  rootCommon,
  data => {
    return data.get('defaultCurrency');
  },
);

// Select active language
export const languageSelector = createSelector(
  rootCommon,
  data => data.get('language') || Actions.DEFAULT_LANGUAGE_CODE,
);

// Select active language
export const defaultLanguageSelector = createSelector(
  rootCommon,
  data => data.get('defaultLanguage') || Actions.DEFAULT_LANGUAGE_CODE,
);

// Select list languages
export const listLanguageSelector = createSelector(
  rootCommon,
  data => data.get('languages'),
);

// Router screen when run app
export const routerMainSelector = createSelector(
  rootCommon,
  isLoginSelector,
  (data, isLogin) => data.getIn(['configs', 'requireLogin']) && !isLogin ? rootSwitch.auth : rootSwitch.main,
);

export const themeSelector = createSelector(
  rootCommon,
  data => {
    return data.get('theme');
  },
);

export const listImageSelector = createSelector(
  rootCommon,
  data => {
    const theme = data.get('theme');
    return theme && imagesTheme[theme] ? imagesTheme[theme] : imagesTheme.light;
  },
);

export const productViewSelector = createSelector(
  rootCommon,
  data => data.get('productView') || Actions.PRODUCT_VIEW_STYLE_1,
);

export const columnProductSelector = createSelector(
  productViewSelector,
  data => {
    const listSwitch = Actions.LIST_SWITCH_PRODUCT;
    const objCol = listSwitch.find(switchValue => switchValue.view === data)
      ? listSwitch.find(switchValue => switchValue.view === data)
      : listSwitch[0];
    return objCol.col;
  },
);

// list templates
export const templatesSelector = createSelector(
  rootCommon,
  data => data.get('templates'),
);

// Get active template
export const activeTemplateSelector = createSelector(
  rootCommon,
  data => {
    const templateActive = data.get('templateActive');
    const templates = data.get('templates');
    const templateActiveData = templateActive
      ? templates.find(con => con.get('id') === templateActive.get('id'))
      : null;
    const template = templates.find(
      con => con.get('status') && parseInt(con.get('status')),
    )
      ? templates.find(con => con.get('status') && parseInt(con.get('status')))
      : templates.first();
    return templateActiveData ? templateActiveData : template;
  },
);

// Get colors
export const colorsSelector = createSelector(
  activeTemplateSelector,
  template => {
    if (!template) {
      return {};
    }

    const settings = template.get('settings')
      ? JSON.parse(template.get('settings'))
      : [];
    const colors = settings.find(setting => setting.type === 'colors');

    if (!colors) {
      return {};
    }

    let colorConfig = {};

    forEach(colors.fields, color => {
      colorConfig = Object.assign({}, colorConfig, {[color.key]: color.value});
    });

    return colorConfig;
  },
);

/**
 * Normalized template config
 * @type {OutputSelector<unknown, Map<any, any>, (res: *) => Map<any, any>>}
 */
export const getTemplateConfigSelector = createSelector(
  activeTemplateSelector,
  template => {
    let templateConfig = Map();
    const settings = JSON.parse(template.get('settings'));
    for (let setting of settings) {
      let config = Map();
      for (let field of setting.fields) {
        config = config.set(field.key, fromJS(field.value));
      }
      templateConfig = templateConfig.set(setting.type, config);
    }
    return templateConfig;
  },
);

// Get active config
export const dataConfigSelector = createSelector(
  activeTemplateSelector,
  data => {
    if (data && data.get('data')) {
      const stringData = JSON.parse(data.get('data'));

      const arrayData = stringData.map(item => {
        const {spacing, layout, fields} = item;

        let valueSpacing = {};
        let valueField = {};
        const valueLayout = layout && layout.value ? layout.value : undefined;

        if (spacing) {
          spacing.map(space => {
            valueSpacing = {
              ...valueSpacing,
              ...space.value,
            };
          });
        }

        if (fields) {
          fields.map(field => {
            valueField = {
              ...valueField,
              [field.key]: field.value,
            };
          });
        }
        return {
          id: item.id,
          type: item.type,
          name: item.name,
          spacing: valueSpacing,
          layout: valueLayout,
          fields: valueField,
        };
      });
      return arrayData;
    }
    return [];
  },
);

// Get demo config
export const getDemoSelector = createSelector(
  rootCommon,
  common => common.get('demo')
);

// Get colors
export const popupHomeSelector = createSelector(
  activeTemplateSelector,
  template => {
    if (!template) {
      return {};
    }

    const settings = template.get('settings')
      ? JSON.parse(template.get('settings'))
      : [];
    const popupData = settings.find(setting => setting.type === 'popup');

    if (!popupData || !popupData.fields || popupData.fields.length < 1) {
      return {};
    }
    let popupConfig = {};

    forEach(popupData.fields, color => {
      popupConfig = Object.assign({}, popupConfig, {[color.key]: color.value});
    });
    return popupConfig;
  },
);
