import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'src/components';
import Container from 'src/containers/Container';

import { cartTotalSelector } from 'src/modules/cart/selectors';
import { currencySelector } from 'src/modules/common/selectors';

import currencyFormatter from 'src/utils/currency-formatter';

const CartTotal = props => {
  const { t } = useTranslation();
  const { style, total, currency } = props;
  return (
    <Container
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style && style,
      ]}
    >
      <View style={{ flex: 1 }}>
        {/*<Text h6 colorSecondary>*/}
          {/*Subtotal {currencyFormatter(total, currency)}*/}
        {/*</Text>*/}
        {/*<Text h6 colorSecondary>*/}
          {/*Coupon $0*/}
        {/*</Text>*/}
        <Text>{t('cart:text_total')}</Text>
      </View>
      <Text h3 medium>
        {currencyFormatter(total, currency)}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    total: cartTotalSelector(state),
    currency: currencySelector(state)
  };
};

export default connect(mapStateToProps)(CartTotal);
