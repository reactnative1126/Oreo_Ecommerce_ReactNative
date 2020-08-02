import React from 'react';
import {useTranslation} from 'react-i18next';

import {StyleSheet, ScrollView, View} from 'react-native';
import {Text} from 'src/components';
import OpacityView from 'src/containers/OpacityView';
import FooterOrderInfo from './FooterOrderInfo';
import AvatarOrderInfo from './AvatarOrderInfo';

import currencyFormatter from 'src/utils/currency-formatter';
import {orange, blue} from 'src/components/config/colors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';

const OrderInfo = props => {
  const {order, nextStep, handlePayment, currency, selected} = props;
  const {t} = useTranslation();

  const progressPayment = selected === 'stripe' || selected === 'paypal' || selected === 'razorpay';
  const shipping = currencyFormatter(order.get('shipping_total'), currency);
  const discount = currencyFormatter(order.get('discount_total'), currency);
  const tax = currencyFormatter(order.get('total_tax'), currency);

  let message = t('cart:text_payment_message_default');
  // let message = 'Thank you for your order!';

  if (progressPayment) {
    message = t('cart:text_payment_message');
  } else if ('cod') {
    message = t('cart:text_payment_message_cod');
  } else if ('bacs') {
    message = t('cart:text_payment_message_bacs');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.viewContent}>
          <Text medium h2 style={styles.textTitle}>
            {t('cart:text_payment_confirm')}
          </Text>
          <AvatarOrderInfo/>
          <Text medium h4 style={styles.textId}>
            {t('cart:text_payment_id', {id: order.get('id')})}
          </Text>
          <OpacityView bgColor={blue} opacity={0.08} style={styles.viewMessage}>
            <Text style={styles.textMessage}>{message}</Text>
          </OpacityView>
        </View>
      </ScrollView>
      <FooterOrderInfo
        shipping={shipping}
        discount={discount}
        tax={tax}
        total={currencyFormatter(order.get('total'), currency)}
        onPressConfirm={() => progressPayment ? handlePayment() : nextStep()}
        style={styles.footer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    flexGrow: 1,
    // paddingHorizontal: padding.big,
  },
  viewContent: {
    alignItems: 'center',
    paddingHorizontal: padding.big,
  },
  textTitle: {
    marginBottom: margin.big,
  },
  textId: {
    color: orange,
    marginTop: margin.large * 2,
    marginBottom: margin.big,
  },
  viewMessage: {
    width: '100%',
    borderRadius: borderRadius.large,
    marginBottom: 2 * margin.big,
  },
  textMessage: {
    marginVertical: margin.large + 2,
    marginHorizontal: margin.big,
    textAlign: 'center',
    color: blue,
  },
  footer: {
    paddingHorizontal: padding.big,
    marginBottom: margin.big
  },
});

export default OrderInfo;
