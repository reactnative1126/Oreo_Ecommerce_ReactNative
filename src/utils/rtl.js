import { I18nManager } from 'react-native';

/**
 * Const RTL_CODE
 * @type {string[]}
 */
const RTL_CODE = [
  'ae' /* Avestan */,
  'ar' /* 'العربية', Arabic */,
  'arc' /* Aramaic */,
  'bcc' /* 'بلوچی مکرانی', Southern Balochi */,
  'bqi' /* 'بختياري', Bakthiari */,
  'ckb' /* 'Soranî / کوردی', Sorani */,
  'dv' /* Dhivehi */,
  'fa' /* 'فارسی', Persian */,
  'glk' /* 'گیلکی', Gilaki */,
  'he' /* 'עברית', Hebrew */,
  'ku' /* 'Kurdî / كوردی', Kurdish */,
  'mzn' /* 'مازِرونی', Mazanderani */,
  'nqo' /* N'Ko */,
  'pnb' /* 'پنجابی', Western Punjabi */,
  'ps' /* 'پښتو', Pashto, */,
  'sd' /* 'سنڌي', Sindhi */,
  'ug' /* 'Uyghurche / ئۇيغۇرچە', Uyghur */,
  'ur' /* 'اردو', Urdu */,
  'yi' /* 'ייִדיש', Yiddish */,
];

/**
 * Is RTL
 * @param code
 * @returns {boolean}
 */
export function isRTL(code) {
  return RTL_CODE.indexOf(code) >= 0;
}

/**
 * get dir language
 * @param code
 * @returns {string}
 */
export function getDir(code) {
  return isRTL(code) ? 'rtl' : 'ltr';
}

/**
 * Select dir
 * @param map
 * @returns {*}
 */
export function select(map) {
  const key = I18nManager.isRTL ? 'rtl' : 'ltr';

  return map[key];
}
