import React from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {fromJS} from 'immutable';
import merge from 'lodash/merge';

import {View, Image, Dimensions, FlatList, ScrollView, StyleSheet} from 'react-native';
import {Text, Modal, withTheme} from 'src/components';
import ChooseItem from 'src/containers/ChooseItem';
import TextHtml from 'src/containers/TextHtml';
import Stripe from 'src/screens/cart/gateways/Stripe';
import Heading from 'src/containers/Heading';
// import Container from 'src/containers/Container';
import OrderInfo from './OrderInfo';
import Gateways from '../gateways';

import {paymentGatewaysSelector, currencySelector, defaultCurrencySelector} from 'src/modules/common/selectors';
import {changeData, clearCart} from 'src/modules/cart/actions';
import {selectedPaymentMethod} from 'src/modules/cart/selectors';
import {selectOrder, selectOrderPending, selectUpdateOrderPending} from 'src/modules/order/selectors';
import {paymentStripe} from 'src/modules/order/service';

import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';
import {changeColor, changeLineHeight} from 'src/utils/text-html';

const width = Dimensions.get('window').width;
const paymentAccept = ['cod', 'stripe', 'bacs', 'cheque', 'paypal', 'razorpay'];
const icons = {
  cod: require('src/assets/images/gateway/cod.png'),
  stripe: require('src/assets/images/gateway/stripe.png'),
  bacs: require('src/assets/images/gateway/bacs.png'),
  cheque: require('src/assets/images/gateway/cheque.png'),
  paypal: require('src/assets/images/gateway/paypal.png'),
  razorpay: require('src/assets/images/gateway/razorpay.png'),
};

const contents = {
  OrderInfo,
  Gateways,
};

class PaymentMethod extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
    };
  }

  onChangePaymentMethod = m => {
    const method = fromJS(m);
    const {dispatch} = this.props;
    dispatch(changeData(['payment_method'], method.get('id')));
    dispatch(changeData(['payment_method_title'], method.get('method_title')));

    // Direct bank transfer
    if (method.get('id') === 'bacs') {
      dispatch(changeData(['status'], 'on-hold'));

    // Cash on delivery
    } else if (method.get('id') === 'cod') {
      dispatch(changeData(['status'], 'processing'));
    } else {
      dispatch(changeData(['status'], 'pending'));
    }

  };

  componentDidUpdate(prevProps) {
    const {order} = this.props;
    if (order.get('id') && prevProps.order.get('id') !== order.get('id')) {
      this.setModalVisible(true);
    }
  }

  setModalVisible = visible => {
    this.setState({
      visible: visible,
    });
  };

  handlePayment = () => {
    if (this.flatListPayment) {
      this.flatListPayment.scrollToEnd();
    }
  };

  handleConfirm = () => {
    const {nextStep, dispatch} = this.props;
    nextStep();

    // Clear cart
    dispatch(clearCart());
  };

  handleNext = () => {
    this.setModalVisible(false);
    this.handleConfirm();
  };

  handlePaymentProgress = ({method, data}) => {
    const {order} = this.props;
    if (method && method === 'stripe') {
      paymentStripe({
        order_id: order.get('id'),
        stripe_source: data,
      })
        .then(res => {
          this.setModalVisible(false);
          this.handleConfirm();
        })
        .catch(error => {
          console.log(error, 'error');
        });
    } else {
      this.handleConfirm();
    }
  };

  renderContent = ({item}) => {
    const {order, currency, selected} = this.props;
    const ContentComponent = contents[item];

    return (
      <View style={styles.tabContent}>
        <ContentComponent
          selected={selected}
          currency={currency}
          order={order}
          nextStep={this.handleNext}
          handlePayment={this.handlePayment}
          handlePaymentProgress={this.handlePaymentProgress}
        />
      </View>
    );
  };

  // render payment method
  renderItem = ({item}) => {
    const {selected} = this.props;
    const topElement = (
      <Image source={icons[item.id]} style={{height: 30, marginTop: 4, marginBottom: 6}} resizeMode="stretch"/>
    );
    const bottomElement = <Text medium>{item.title}</Text>;
    return (
      <ChooseItem
        key={item.id}
        item={item}
        onPress={this.onChangePaymentMethod}
        active={selected && item.id && item.id === selected}
        topElement={topElement}
        bottomElement={bottomElement}
        containerStyle={styles.item}
      />
    );
  };

  render() {
    const {visible} = this.state;
    const {paymentGateway, selected, theme} = this.props;

    const methods = paymentGateway
      .get('data')
      .filter(payment => payment.get('enabled') && paymentAccept.includes(payment.get('id')))
      .toJS();

    const method = methods.find(m => m.id === selected);

    return (
      <>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {methods.map(item => this.renderItem({item}))}
        </ScrollView>
        {method ? (
          <>
            <Heading title={method.title} containerStyle={styles.headerText}/>
            {method.id === 'stripe' ? (
              <Image
                source={require('src/assets/images/gateway/stripesuport.png')}
                style={{marginBottom: margin.large}}
              />
            ) : null}
            <TextHtml value={method.description} style={merge(changeColor(theme.Text.secondary.color), changeLineHeight(lineHeights.h4))}/>
          </>
        ) : null}

        <Modal visible={visible} setModalVisible={this.setModalVisible} ratioHeight={0.9}>
          <FlatList
            data={['OrderInfo', 'Gateways']}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            ref={ref => {
              this.flatListPayment = ref;
            }}
            keyExtractor={item => item}
            renderItem={this.renderContent}
          />
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 41,
    paddingBottom: padding.large,
  },
  item: {
    marginRight: margin.base,
  },
  tabContent: {
    flex: 1,
    width: width,
  },
});

const mapStateToProps = state => ({
  currency: currencySelector(state),
  defaultCurrency: defaultCurrencySelector(state),
  paymentGateway: paymentGatewaysSelector(state),
  pending: selectOrderPending(state),
  order: selectOrder(state),
  selected: selectedPaymentMethod(state),
});

export default compose(
  withTheme,
  connect(mapStateToProps),
)(PaymentMethod);
