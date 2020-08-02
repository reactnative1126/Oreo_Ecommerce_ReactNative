import React from 'react';
import {fromJS}from 'immutable';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { Header, Text, ThemedView } from 'src/components';
import Button from 'src/containers/Button';
import { TextHeader, CartIcon, IconHeader } from 'src/containers/HeaderComponent';
import ProductItemOrder from './order/ProductItemOrder';
import ContainerView from './order/ContainerView';
import NoteOrder from './order/NoteOrder';
import ShippingMethod from './order/ShippingMethod';
import AddressInfo from './order/AddressInfo';

import { refundOrder } from 'src/modules/order/actions';
import { refundOrderLoading } from 'src/modules/order/selectors';
import {countrySelector} from 'src/modules/common/selectors';

import styleOrder from './order/styles';
import currencyFormatter from 'src/utils/currency-formatter';
import { fromCharCode } from 'src/utils/string';
import { strDate, objectStatus } from './order/config';

import { margin } from 'src/components/config/spacing';

const prepareAddress = (address = {}, countries = fromJS([])) => {
  const selected = countries.find(country => country.get('code') === address.country);
  const valueCountry = selected ? fromCharCode(selected.get('name')): '';
  return {
    ...address,
    country_name: valueCountry,
  }
};

class DetailOrder extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = props;
    const order = navigation.getParam('order', {});

    this.state = {
      order: order,
      status: objectStatus(order.status),
    };
  }
  handleRefund = () => {
    const { dispatch } = this.props;
    const { order } = this.state;
    const { id, total} = order;
    dispatch(refundOrder(id, total));
  };

  renderBasic = () => {
    const { order, status } = this.state;
    const title = `Code orders: #${order.number}`;
    return (
      <ContainerView title={title}>
        <Text colorSecondary style={styleOrder.text}>
          Order: {strDate(order.date_created)}
        </Text>
        <Text colorSecondary style={styleOrder.text}>
          Status: <Text style={[styleOrder.text, { color: status.color }]}>{status.text}</Text>
        </Text>
      </ContainerView>
    );
  };

  renderListProduct = () => {
    const {
      order: { line_items, currency },
    } = this.state;
    return (
      <ContainerView title="Order Information">
        {line_items.map((item, index) => (
          <ProductItemOrder
            key={item.id}
            item={item}
            lastest={index === line_items.length - 1}
            style={index === line_items.length - 1 && styles.productLast}
            currency={currency}
          />
        ))}
      </ContainerView>
    );
  };

  renderNote = () => {
    const { order } = this.state;
    return (
      <ContainerView title="Order Note">
        <NoteOrder id={order.id} />
      </ContainerView>
    );
  };

  renderTotal = () => {
    const { refundLoading } = this.props;
    const { order } = this.state;

    const total = parseFloat(order.total);
    const tax = parseFloat(order.total_tax);
    const shipping_total = parseFloat(order.shipping_total);
    const discount = parseFloat(order.discount_total);
    const subtotal = total - tax - shipping_total + discount;

    const isTax = tax !== 0;
    const isShipping = shipping_total !== 0;
    const isDiscount = discount !== 0;

    return (
      <ContainerView style={styles.contentFooter}>
        <View style={styles.viewTotal}>
          <View style={styles.totalLeft}>
            <Text h6 colorThird>
              Subtotal {currencyFormatter(subtotal, order.currency)}
            </Text>
            {isTax && (
              <Text h6 colorThird>
                Tax {currencyFormatter(order.total_tax, order.currency)}
              </Text>
            )}
            {isShipping && <Text h6 colorThird>
              Shipping {currencyFormatter(order.shipping_total, order.currency)}
            </Text>}
            {isDiscount && <Text h6 colorThird>
              Discount {currencyFormatter(order.discount_total, order.currency)}
            </Text>}
          </View>
          <Text h3 medium>
            {currencyFormatter(order.total, order.currency)}
          </Text>
        </View>
        {order.status === 'completed' && <Button title="Refund" type="outline" buttonStyle={styles.button} containerStyle={styles.containerButton} loading={refundLoading} onPress={this.handleRefund} />}
      </ContainerView>
    );
  };

  render() {
    const { country, screenProps: { t }} = this.props;
    const {order} = this.state;
    const countries = country.get('data');
    // console.log('test order', JSON.stringify(order))
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_orders')} />}
          rightComponent={<CartIcon />}
        />
        <ScrollView>
          {this.renderBasic()}
          {/*{this.renderShippingMethod()}*/}

          {order.shipping_lines && order.shipping_lines.length > 0 ?(
            <>
              <ShippingMethod
                total={order.shipping_total}
                tax={order.shipping_tax}
                list={order.shipping_lines}
                currency={order.currency}
              />
              <AddressInfo
                title='Shipping Information'
                address={prepareAddress(order.shipping, countries)}
              />
            </>
          ) : null}
          <ContainerView title="Payment method" subTitle={order.payment_method_title} />
          <AddressInfo
            title='Billing Address'
            address={prepareAddress(order.billing, countries)}
            isBilling
          />
          {this.renderListProduct()}
          {order.customer_note ? <ContainerView title="Note order">
            <Text>{order.customer_note}</Text>
          </ContainerView> : null}
          {this.renderNote()}
          {this.renderTotal()}
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  contentFooter: {
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  productLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  viewTotal: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: margin.big,
  },
  totalLeft: {
    flex: 1,
    marginRight: margin.base,
  },
  containerButton: {
    marginVertical: margin.base,
  },
  button: {
    paddingHorizontal: 52,
  },
};

const mapStateToProps = state => {
  return {
    refundLoading: refundOrderLoading(state),
    country: countrySelector(state),
  }
};

export default connect(mapStateToProps)(DetailOrder);
