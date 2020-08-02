import React from 'react';

import { useTranslation } from 'react-i18next';
import Heading from 'src/containers/Heading';
import ProductList from 'src/screens/home/containers/ProductList';

import { padding } from 'src/components/config/spacing';

function RelatedProducts({ data }) {
  const { t } = useTranslation();
  return (
    <ProductList
      headingElement={<Heading title={t('catalog:text_related')} containerStyle={{ paddingHorizontal: padding.large }}/>}
      navigationType="push"
      fields={{
        boxed: true,
        product_type: {
          type: 'custom',
          ids: data,
        },
      }}
      layout='threecolumns'
    />
  );
}

export default RelatedProducts;
