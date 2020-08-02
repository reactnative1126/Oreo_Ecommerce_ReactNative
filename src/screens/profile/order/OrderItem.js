import React from 'react';
import { useTranslation } from 'react-i18next';
import { withNavigation } from 'react-navigation';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text, ThemedView } from 'src/components';
import { Row, Col } from 'src/containers/Gird';

import { strDate, objectStatus } from './config';
import { profileStack } from 'src/config/navigator';
import { margin, padding, borderRadius } from 'src/components/config/spacing';
import { lineHeights } from 'src/components/config/fonts';

const OrderItem = ({ data, navigation, style, ...rest }) => {
  const { t } = useTranslation();
  const { billing } = data;
  const nameBilling = `${billing.first_name} ${billing.last_name}`;
  const name = `#${data.number} ${nameBilling}`;
  const statusValue = objectStatus(data.status);
  const onPress = () => navigation.navigate(profileStack.order_detail, { order: data });

  return (
    <ThemedView style={[styles.container, style && style]} colorSecondary>
      <TouchableOpacity style={styles.touch} onPress={onPress} {...rest}>
        <Row style={styles.row}>
          <Col style={styles.col}>
            <Text h4 medium style={styles.title}>
              {name}
            </Text>
            <Text style={styles.textInfo} h6 colorThird>
              {t('profile:text_code_order', { code: data.number })}
              {'\n'}
              {t('profile:text_time_order', { time: strDate(data.date_created) })}
              {'\n'}
              {t('profile:text_status_order')}
              <Text style={{ color: statusValue.color }} h6>
                {statusValue.text}
              </Text>
            </Text>
          </Col>
          <Icon name={statusValue.icon} color={statusValue.color} size={17} containerStyle={styles.icon} />
        </Row>
      </TouchableOpacity>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.base,
    marginHorizontal: margin.large,
  },
  touch: {
    padding: padding.large,
  },
  row: {
    marginLeft: 0,
    marginRight: 0,
  },
  col: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    marginBottom: margin.small,
  },
  textInfo: {
    lineHeight: lineHeights.base,
  },
  icon: {
    marginLeft: margin.large,
    marginTop: 2,
  },
});

export default withNavigation(OrderItem);
