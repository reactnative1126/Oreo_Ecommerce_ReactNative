import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';
import {withTranslation} from 'react-i18next';

import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import {Text, ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';
import Heading from 'src/containers/Heading';
import Input from 'src/containers/input/Input';
import TextHtml from 'src/containers/TextHtml';
import ShippingForm from './ShippingForm';

import {countrySelector} from 'src/modules/common/selectors';
import {noteCustomerSelector} from 'src/modules/cart/selectors';
import {changeData} from 'src/modules/cart/actions';

import {fromCharCode} from 'src/utils/string';

import {margin, padding} from 'src/components/config/spacing';
import fonts, {lineHeights} from 'src/components/config/fonts';
import ContainerPrivacy from 'src/screens/profile/containers/ContainerPrivacy';

class PaymentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      edit: !props.params || !props.params.useAsBilling,
      isModal: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      this.setState({
        edit: !this.props.params || !this.props.params.useAsBilling,
      });
    }
  }
  onEdit = () => {
    this.setState({
      edit: true,
    });
  };
  changeNote = value => {
    this.props.dispatch(changeData(['customer_note'], value));
  };

  handleData = () => {
    const {data, country} = this.props;
    const countries = country.get('data');
    const findCountry = countries.find(
      c => c.get('code') === data.get('country'),
    );

    return (
      <>
        <Text colorSecondary style={styles.textName}>
          {data.get('first_name')} {data.get('last_name')}
        </Text>
        <Text colorThird style={styles.textBilling}>
          {data.get('address_1')}
        </Text>
        <Text colorThird style={styles.textBilling}>
          {data.get('city')}
        </Text>
        <Text colorThird style={styles.textBilling}>
          {data.get('postcode')}
        </Text>
        {findCountry && (
          <Text colorThird style={styles.textBilling}>
            {fromCharCode(findCountry.get('name'))}
          </Text>
        )}
      </>
    );
  };

  render() {
    const {customer_note, onChange, data, errors, t} = this.props;
    const {edit} = this.state;

    return (
      <View style={styles.container}>
        <Heading
          title={t('cart:text_billing_address')}
          subTitle={!edit ? t('common:text_edit') : false}
          onPress={this.onEdit}
          containerStyle={styles.headerText}
        />
        {edit ? (
          <ShippingForm onChange={onChange} data={data} errors={errors} />
        ) : (
          this.handleData()
        )}
        <Heading
          title={t('cart:text_note')}
          containerStyle={styles.headerText}
        />
        <Input
          label={t('inputs:text_note')}
          multiline
          value={customer_note}
          onChangeText={this.changeNote}
        />
        <TouchableOpacity
          style={styles.textDescription}
          onPress={() => this.setState({
            isModal: true
          })}
        >
          <TextHtml
            value={t('cart:text_payment_privacy')}
            style={{
              b: fonts.medium
            }}
          />
        </TouchableOpacity>
        <Modal
          visible={this.state.isModal}
          transparent
          backdropColor='transparent'
          onRequestClose={() => this.setState({ isModal: false})}
        >
          <ThemedView isFullView>
            <Header
              leftComponent={<IconHeader onPress={() => this.setState({ isModal: false})}/>}
              centerComponent={<TextHeader title={t('common:text_privacy')} />}
              rightComponent={<CartIcon />}
              containerStyle={styles.headerPrivacy}
            />
            <ContainerPrivacy />
          </ThemedView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: margin.big,
  },
  headerText: {
    paddingTop: 41,
    paddingBottom: padding.large,
  },
  textName: {
    marginBottom: margin.small,
  },
  textBilling: {
    lineHeight: lineHeights.h4 + 1,
  },
  textDescription: {
    marginTop: margin.big,
  },
  headerPrivacy: {
    // paddingTop: 0, height: 56
  },
});

const mapStateToProps = state => ({
  country: countrySelector(state),
  customer_note: noteCustomerSelector(state),
});

export default compose(
    withTranslation(),
    connect(mapStateToProps)
)(PaymentForm);
