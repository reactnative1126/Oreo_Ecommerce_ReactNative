import React from 'react';
import {Text} from 'src/components';
import ContainerView from './ContainerView';
import styles from './styles';
import currencyFormatter from 'src/utils/currency-formatter';

const ShippingMethod = ({ list, total, tax, currency}) => {
  const isShippingTax = tax && parseFloat(tax) !== 0;
  const getShipping = list && list[0] ? list[0] : null;
  const subTitle = getShipping && getShipping.method_title ? getShipping.method_title : null;
  if (!subTitle) {
    return null;
  }
  return (
    <ContainerView title="Shipping Method" subTitle={subTitle}>
      <Text colorSecondary style={styles.text}>
        Fee shipping: {currencyFormatter(total, currency)}
      </Text>
      {isShippingTax && (
        <Text colorSecondary style={styles.text}>
          Fee shipping tax: {currencyFormatter(tax, currency)}
        </Text>
      )}
    </ContainerView>
  )
};

export default ShippingMethod;
