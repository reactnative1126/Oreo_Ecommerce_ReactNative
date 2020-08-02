import {fromJS, Map} from 'immutable';
import lowerCase from 'lodash/lowerCase';

export function findVariation(variations, meta_data) {
  return variations.find(variation => {
    return variation.get('attributes').every(attribute => {
      const option = meta_data.find(m => m.get('id') === attribute.get('id') && m.get('name') === attribute.get('name'));
      // Any options
      if (!option) {
        return true;
      }
      return attribute.equals(option);
    });
  });
}

/**
 * Prepare product variations
 * @param variations: product variations
 * @param attributes: origin attribute
 * @returns {*}
 */
export function prepareProductVariations(variations, attributes) {
  return variations.map(variation => {
    return variation.update('attributes', attrs => {
      return attrs.map(attr => {
        if (attr.get('id') === 0) {
          return fromJS({
            id: attr.get('id'),
            // attribute_name: attr.get('name'),
            name: attr.get('option'),
            option: attr.get('option'),
          });
        }

        const options = attributes
          .find(_attr => _attr.get('id') === attr.get('id'))
          .get('options');
        const option = options.find(
          option => option.get('name') === attr.get('option'),
        );

        return fromJS({
          id: attr.get('id'),
          // attribute_name: attr.get('name'),
          name: attr.get('name'),
          option: option.get('name'),
        });
      });
    });
  });
}

export function filterOptions(options, attribute, variations) {
  const _options = options.filter(option => {
    return variations.some(variation => {
      const attributesVariation = variation.get('attributes');
      // any
      if (attributesVariation.size === 0) {
        return true;
      }

      const _attribute = attributesVariation.find(attr => attr.get('id') === attribute.get('id') && attr.get('name') === attribute.get('name'))


      if (!_attribute) {
        return true;
      }

      // match option
      return lowerCase(_attribute.get('option')) === lowerCase(option.get('option'));
    });
  });
  return _options;
}

/**
 * Prepare data for product attribute
 * @param productAttributes: list product attribute
 * @param attributes: list all attributes in website
 * @returns {*}
 */
export function prepareAttributes(productAttributes, attributes, variations) {
  return productAttributes.map(productAttribute => {
    // attribute options
    const options = productAttribute.get('options');

    const newAttribute = Map({
      id: productAttribute.get('id'),
      name: productAttribute.get('name'),
      key: productAttribute.get('name'),
      position: productAttribute.get('position'),
      type: 'button',
    });

    if (productAttribute.get('id') === 0 || productAttribute.get('id') === '0') {
      return newAttribute.set('options', filterOptions(options.map(option => Map({
        name: option,
        value: option,
        option,
      })), newAttribute, variations));
    }

    const attribute = attributes.find(attr => attr.get('id') === productAttribute.get('id'));

    // Prepare product options
    const options1 = options.map(option => {
      const originOptions = attribute.get('options').find(op => op.get('name') === option);
      return Map({
        name: originOptions.get('name'),
        option: originOptions.get('name'),
        value: originOptions.get('value') || originOptions.get('slug'),
      })
    });

    // filter product options
    const options2 = filterOptions(options1, newAttribute, variations);

    return newAttribute
      .set('options', options2)
      .set('type', attribute.get('type'))
      .set('key', attribute.get('slug'));
  });
}

/**
 * Check option on/off
 * @param variations product variation
 * @param meta_data attribute selected
 * @param option current option node
 * @returns {boolean}
 */
export function checkOption(variations, meta_data, option) {
  if (meta_data.size < 1) {
    return true;
  }
  const indexAttribute = meta_data.findIndex(i => i.get('id') === option.get('id') && i.get('name') === option.get('name'));
  const isAttribute =
    indexAttribute >= 0 ? meta_data.get(indexAttribute) : null;

  if (
    isAttribute &&
    lowerCase(isAttribute.get('option')) === lowerCase(option.get('option'))
  ) {
    return true;
  }
  const new_meta_data = isAttribute
    ? meta_data.setIn([indexAttribute, 'option'], option.get('option'))
    : meta_data.push(option);

  // find all variation match
  const _variations = variations.filter(variation => {
    if (!variation.get('purchasable')) {
      return false;
    }
    const attributes = variation.get('attributes');
    // any attributes
    if (attributes.size === 0) {
      return true;
    }
    // matches
    return attributes.every(attribute => {
      const _option = new_meta_data.find(
        attr =>
          attr.get('id') === attribute.get('id') && attr.get('name') === attribute.get('name'));
      // Any options
      if (!_option) {
        return true;
      }
      // equals option
      return lowerCase(attribute.get('option')) === lowerCase(_option.get('option'))
    });
  });
  return _variations.size > 0;
}
