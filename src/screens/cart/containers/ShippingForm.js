import React from 'react';
import {withTranslation} from 'react-i18next';
import {Map} from 'immutable';

import {View, StyleSheet} from 'react-native';

import {Row, Col} from 'src/containers/Gird';
import Input from 'src/containers/input/Input';
import InputCountry from './InputCountry';

import {margin} from 'src/components/config/spacing';

class ShippingAddress extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {onChange, data, errors, t} = this.props;
    if (!data || !data.size) {
      return null;
    }

    return (
      <View>
        <Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('first_name')}
              label={t('inputs:text_first_name')}
              value={data.get('first_name')}
              onChangeText={value => onChange('first_name', value)}
            />
          </Col>
          <Col>
            <Input
              error={errors && errors.get('last_name')}
              label={t('inputs:text_last_name')}
              value={data.get('last_name')}
              onChangeText={value => onChange('last_name', value)}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <Input
              label={t('inputs:text_company')}
              value={data.get('company')}
              onChangeText={value => onChange('company', value)}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <InputCountry
              error={errors && errors.get('country')}
              label={t('inputs:text_country')}
              value={data.get('country')}
              onChange={onChange}
              state={data.get('state')}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('address_1')}
              label={t('inputs:text_address')}
              value={data.get('address_1')}
              onChangeText={value => onChange('address_1', value)}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('address_2')}
              label={t('inputs:text_address_2')}
              value={data.get('address_2')}
              onChangeText={value => onChange('address_2', value)}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('city')}
              label={t('inputs:text_city')}
              value={data.get('city')}
              onChangeText={value => onChange('city', value)}
            />
          </Col>
          <Col>
            <Input
              error={errors && errors.get('postcode')}
              label={t('inputs:text_postcode')}
              value={data.get('postcode')}
              onChangeText={value => onChange('postcode', value)}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('email')}
              label={t('inputs:text_email')}
              value={data.get('email')}
              onChangeText={value => onChange('email', value)}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('phone')}
              label={t('inputs:text_phone')}
              value={data.get('phone')}
              onChangeText={value => onChange('phone', value)}
            />
          </Col>
        </Row>

      </View>
    );
  }
}

ShippingAddress.defaultProps = {
  errors: Map(),
};

const styles = StyleSheet.create({
  row: {
    marginBottom: margin.base,
  },
});

export default withTranslation()(ShippingAddress);
