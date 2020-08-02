import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from "react-native";
import {Divider, Text} from 'src/components';
import {Col, Row} from 'src/containers/Gird';
import Button from 'src/containers/Button';
import {padding} from 'src/components/config/spacing';

const FooterOrderInfo = ({shipping, discount, tax, total, onPressConfirm, style}) => {
  const {t} = useTranslation();
  return (
    <View style={style && style}>
      <Divider/>
      <Row style={styles.viewPrice}>
        <Col style={styles.priceLeft}>
          <Text colorThird>{t('cart:text_payment_shipping', {cost: shipping})}</Text>
          <Text colorThird>{t('cart:text_payment_discount', {cost: discount})}</Text>
          <Text colorThird>{t('cart:text_payment_tax', {cost: tax})}</Text>
        </Col>
        <Text medium h2>
          {total}
        </Text>
      </Row>
      <Button
        title={t('common:text_confirm')}
        onPress={onPressConfirm}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  viewPrice: {
    paddingVertical: padding.large,
    alignItems: 'flex-end',
    marginLeft: 0,
    marginRight: 0,
  },
  priceLeft: {
    paddingLeft: 0,
    paddingRight: padding.large,
  },
});

export default FooterOrderInfo;
