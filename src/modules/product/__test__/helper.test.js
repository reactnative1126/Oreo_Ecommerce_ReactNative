import { fromJS } from 'immutable';

import {
  prepareProductAttribute,
  prepareProductAttributeDefault,
  prepareProductVariations,
  filterVariations,
} from '../helper';

import attributes from 'src/mock/attributes';
import {
  productAttributeColor1,
  productAttributeColor2,
  productAttributeNoTaxonomy,
} from 'src/mock/product-attributes';

import { productAttributeDefault } from 'src/mock/product-attributes-default';
import { productVariations1, productVariations2, productVariations3 } from 'src/mock/variations';

const attributeInput = fromJS(attributes);

describe('Prepare product attribute', () => {
  it('should handle attribute with no taxonomy', () => {
    const expectAttributes = [
      {
        id: 0,
        name: 'State',
        position: 0,
        visible: true,
        variation: true,
        options: [
          {
            id: 0,
            name: 'New',
            slug: 'New',
            key: 'State',
            value: '',
          },
          {
            id: 0,
            name: 'Re-sale',
            slug: 'Re-sale',
            key: 'State',
            value: '',
          },
        ],
      },
    ];

    const productAttribute = fromJS(productAttributeNoTaxonomy);
    const result = prepareProductAttribute(productAttribute, attributeInput);

    expect(result.toJS()).toStrictEqual(expectAttributes);
  });

  it('should handle attribute color 1', () => {
    const expectAttributes = [
      {
        id: 3,
        name: 'Color',
        position: 1,
        type: 'color',
        visible: true,
        variation: false,
        options: [
          {
            id: 3,
            name: 'Aqua',
            slug: 'aqua',
            key: 'pa_color',
            value: '#00aba9',
          },
        ],
      },
    ];

    const productAttribute = fromJS(productAttributeColor1);
    const result = prepareProductAttribute(productAttribute, attributeInput);

    expect(result.toJS()).toStrictEqual(expectAttributes);
  });

  it('should handle attribute color 2', () => {
    const expectAttributes = [
      {
        id: 3,
        name: 'Color',
        position: 1,
        type: 'color',
        visible: true,
        variation: false,
        options: [
          {
            id: 3,
            name: 'Aqua',
            slug: 'aqua',
            key: 'pa_color',
            value: '#00aba9',
          },
          {
            id: 3,
            name: 'Black',
            slug: 'black',
            key: 'pa_color',
            value: '#000000',
          },
        ],
      },
    ];

    const productAttribute = fromJS(productAttributeColor2);
    const result = prepareProductAttribute(productAttribute, attributeInput);

    expect(result.toJS()).toStrictEqual(expectAttributes);
  });

  it('should handle attribute default', () => {
    const expectAttributes = [
      {
        id: 0,
        name: 'Re-sale',
        slug: 'Re-sale',
        key: 'State',
        value: '',
      },
      {
        id: 3,
        name: 'Aqua',
        slug: 'aqua',
        key: 'pa_color',
        value: '#00aba9',
      },
    ];

    const productAttribute = fromJS(productAttributeDefault);
    const result = prepareProductAttributeDefault(productAttribute, attributeInput);

    expect(result.toJS()).toStrictEqual(expectAttributes);
  });
});

describe('Prepare product variations', () => {
  it('should handle variation with no taxonomy', () => {
    const expectVariations = [
      {
        attributes: [
          {
            id: 0,
            name: 'Re-sale',
            slug: 'Re-sale',
            key: 'State',
            value: '',
          },
        ],
      },
    ];

    const productVariations = fromJS(productVariations1);
    const result = prepareProductVariations(productVariations, attributeInput);

    expect(result.toJS()).toStrictEqual(expectVariations);
  });

  it('should handle variation', () => {
    const expectVariations = [
      {
        attributes: [
          {
            id: 4,
            name: 'M',
            slug: 'm',
            key: 'pa_size',
            value: '',
          },
          {
            id: 5,
            name: 'Bamma',
            slug: 'bamma',
            key: 'pa_image',
            value: 'https://cdn.rnlab.io/uploads/2019/06/28100437/j9-150x150.jpg',
          },
        ],
      },
    ];

    const productVariations = fromJS(productVariations2);
    const result = prepareProductVariations(productVariations, attributeInput);

    expect(result.toJS()).toStrictEqual(expectVariations);
  });
});

describe('Filter product variations', () => {
  it('Case 1', () => {
    const meta_data = fromJS([{ id: 4, name: 'M', slug: 'm', key: 'pa_size', value: '' }]);

    const productVariations = prepareProductVariations(fromJS(productVariations3), attributeInput);

    const result = filterVariations(productVariations, meta_data);

    expect(result.toJS()).toStrictEqual(productVariations.toJS());
  });
});
