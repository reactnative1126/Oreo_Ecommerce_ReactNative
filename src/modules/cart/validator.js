import { Map } from 'immutable';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

export function validatorAddress(shipping) {
  let errors = Map();
  if (!shipping.get('first_name') || !isLength(shipping.get('first_name'), { min: 1, max: 32 })) {
    errors = errors.set('first_name', 'First Name must be between 1 and 32 characters!');
  }

  if (!shipping.get('last_name') || !isLength(shipping.get('last_name'), { min: 1, max: 32 })) {
    errors = errors.set('last_name', 'Last Name must be between 1 and 32 characters!');
  }

  if (!shipping.get('city') || !isLength(shipping.get('city'), { min: 2, max: 128 })) {
    errors = errors.set('city', 'City must be between 2 and 128 characters!');
  }

  if (!shipping.get('address_1') || !isLength(shipping.get('address_1'), { min: 3, max: 128 })) {
    errors = errors.set('address_1', 'Address must be between 3 and 128 characters!');
  }

  if (!shipping.get('postcode') && !isLength(shipping.get('postcode'), { min: 2, max: 10 })) {
    errors = errors.set('postcode', 'Postcode must be between 2 and 10 characters!');
  }

  if (!shipping.get('country')) {
    errors = errors.set('country', 'Please select country!');
  }

  if (!shipping.get('phone') || !isMobilePhone(shipping.get('phone'))) {
    errors = errors.set('phone', 'Phone number does not appear to be valid!');
  }

  if (!shipping.get('email') || !isEmail(shipping.get('email'))) {
    errors = errors.set('email', 'E-Mail Address does not appear to be valid!');
  }

  return errors;
}
