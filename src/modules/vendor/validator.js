import {Map} from 'immutable';
import isLength from 'validator/lib/isLength';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';

import en from 'src/locales/en.json';
import ar from 'src/locales/ar.json';

const languages = {
  en,
  ar,
};

export function validatorContact(data, language) {
  const t = languages[language] ? languages[language] : languages.en;
  const validators = t.validators || {};

  let errors = Map();

  if (
    !data ||
    !data.name ||
    !isLength(data.name, {min: 1})
  ) {
    errors = errors.set('name', validators.text_name);
  }

  if (!data || !data.email || !isEmail(data.email)) {
    errors = errors.set('email', validators.text_email);
  }

  if (!data || !data.message || !isLength(data.message, {min: 1})) {
    errors = errors.set('message', validators.text_message);
  }

  return errors;
}

export function validatorReview(data, language) {
  const t = languages[language] ? languages[language] : languages.en;
  const validators = t.validators || {};

  let errors = Map();

  if (
    !data ||
    !data.title ||
    !isLength(data.title, {min: 1})
  ) {
    errors = errors.set('title', validators.text_title);
  }

  if (
    !data ||
    !data.content ||
    !isLength(data.content, {min: 1})
  ) {
    errors = errors.set('content', validators.text_content);
  }

  return errors;
}
