import React from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {fromJS, Map} from 'immutable';
import {withTranslation} from 'react-i18next';

import {ScrollView, StyleSheet, Switch, View} from 'react-native';
import {Text} from 'src/components';
import Container from 'src/containers/Container';
import Button from 'src/containers/Button';
import {Row, Col} from 'src/containers/Gird';
import Heading from 'src/containers/Heading';
import ShippingForm from './ShippingForm';
import ShippingMethod from './ShippingMethod';

import {shippingAddressSelector} from 'src/modules/auth/selectors';
import {
  selectShippingAddress,
  selectedShippingMethod,
} from 'src/modules/cart/selectors';
import {isLoginSelector} from 'src/modules/auth/selectors';
import {changeData} from 'src/modules/cart/actions';
import {validatorAddress} from 'src/modules/cart/validator';

import {margin, padding} from 'src/components/config/spacing';
import {calcCost} from 'src/utils/product';

import {red} from 'src/components/config/colors';

class Shipping extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      useAsBilling: true,
      errors: Map(),
    };
  }

  onChange = (key, value) => {
    const {dispatch} = this.props;
    dispatch(changeData(['shipping', key], value));
  };

  /**
   * Handle re user my address
   */
  handleUserMyShippingAddress = () => {
    const {dispatch, shippingAddress} = this.props;
    dispatch(changeData(['shipping'], shippingAddress));
  };

  onChangeShippingMethod = method => {
    const {dispatch} = this.props;
    dispatch(
      changeData(
        ['shipping_lines', 0],
        fromJS({
          id: method.id,
          method_id: method.method_id,
          method_title: method.method_title,
          total: calcCost(method),
        }),
      ),
    );
  };

  handleNext = () => {
    const {shipping, selected, nextStep, dispatch} = this.props;

    // Validation
    let errors = validatorAddress(shipping);
    if (!selected) {
      errors = errors.set('shipping_lines', 'Please select shipping method!');
    }

    if (errors.size) {
      this.setState({
        errors,
      });
    } else {
      // Same billing address
      const {useAsBilling} = this.state;
      if (useAsBilling) {
        dispatch(changeData(['billing'], shipping));
      }
      this.setState({
        errors: Map(),
      });
      nextStep({useAsBilling});
    }
  };

  render() {
    const {backStep, shipping, selected, isLogin, t} = this.props;
    const {useAsBilling, errors} = this.state;

    return (
      <ScrollView>
        <Container style={styles.content}>
          <Heading
            title={t('cart:text_delivery')}
            subTitleComponent={isLogin && (
              <Button
                title={t('cart:text_use_my_address')}
                type={'outline'}
                size={'small'}
                onPress={this.handleUserMyShippingAddress}
              />
            )}
            containerStyle={[styles.textTitle, styles.headingDelivery]}
          />
          <ShippingForm
            errors={errors}
            data={shipping}
            onChange={this.onChange}
          />
          <View style={styles.useAsBilling}>
            <Text style={styles.usAsBillingText} colorSecondary>
              {t('cart:text_use_billing')}
            </Text>
            <Switch
              value={useAsBilling}
              onValueChange={() => this.setState({useAsBilling: !useAsBilling})}
            />
          </View>
          <Heading
            title={t('cart:text_shipping_method')}
            containerStyle={styles.textTitle}
          />

          <Text style={{color: red}}>{errors.get('shipping_lines')}</Text>

          <ShippingMethod
            selected={selected}
            onChangeShippingMethod={this.onChangeShippingMethod}
            cc={shipping.get('country')}
          />

          <Row style={styles.footer}>
            <Col>
              <Button
                type="outline"
                onPress={backStep}
                title={t('common:text_back')}
              />
            </Col>
            <Col>
              <Button onPress={this.handleNext} title={t('common:text_next')}/>
            </Col>
          </Row>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: padding.large,
  },
  headingDelivery: {
    alignItems: 'center',
  },
  textTitle: {
    paddingTop: 0,
    paddingBottom: padding.base,
  },
  useAsBilling: {
    flexDirection: 'row',
    marginTop: margin.large + 4,
    marginBottom: margin.large + margin.big,
  },
  usAsBillingText: {
    marginVertical: 3,
    flex: 1,
  },
  footer: {
    marginBottom: margin.big,
  },
});

const mapStateToProps = state => ({
  shipping: selectShippingAddress(state),
  selected: selectedShippingMethod(state),
  shippingAddress: shippingAddressSelector(state),
  isLogin: isLoginSelector(state),
});

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(Shipping);
