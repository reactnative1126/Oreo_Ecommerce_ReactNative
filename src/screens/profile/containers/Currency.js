// @flow
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import upperCase from 'lodash/upperCase';

import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, ListItem, Modal } from 'src/components';
import Button from 'src/containers/Button'
import { listCurrencySelector, currencySelector } from 'src/modules/common/selectors';
import { changeCurrency } from 'src/modules/common/actions';

import { margin, padding } from 'src/components/config/spacing';
import isEmpty from 'lodash/isEmpty';

/**
 * Component Language
 * @param props
 * @returns {*}
 * @constructor
 */

type Props = {
  title: string,
};

class Currency extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: false,
      currency: props.currency,
    };
  }

  handleSelect = () => {
    const { currency } = this.state;
    const { dispatch } = this.props;
    dispatch(changeCurrency(currency));
    this.setState({
      visible: false,
    });
  };

  rightIcon = () => {
    const { currency, currencies, t } = this.props;
    const { visible } = this.state;
    return (
      <View style={styles.right}>
        <Text h6 colorThird>
          {upperCase(currency)}
        </Text>
        <Modal
          visible={visible}
          setModalVisible={() => this.setState({ visible: false, currency: currency })}
          topRightElement={
            <Button
              onPress={this.handleSelect}
              title={t('common:text_select')}
              size={'small'}
              buttonStyle={styles.button}
            />
          }
        >
          <ScrollView>
            <View style={styles.viewList}>
              {Object.keys(currencies).map(key => (
                <ListItem
                  key={key}
                  type="underline"
                  small
                  title={key}
                  rightIcon={
                    key === this.state.currency && {
                      name: 'check',
                    }
                  }
                  titleProps={
                    key !== this.state.currency
                      ? {
                          colorSecondary: true,
                        }
                      : null
                  }
                  onPress={() => this.setState({ currency: key })}
                />
              ))}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  };

  render() {
    const { title, currencies } = this.props;
    const { visible } = this.state;
    if (isEmpty(currencies)) {
      return null;
    }
    return (
      <ListItem
        title={title}
        chevron
        type="underline"
        onPress={() => this.setState({ visible: !visible })}
        rightElement={this.rightIcon()}
        titleProps={{
          medium: true,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 27,
    height: 14,
    marginRight: margin.small,
  },
  viewList: {
    paddingHorizontal: padding.big,
  },
  button: {
    paddingHorizontal: padding.big + 4,
  },
});

Currency.defaultProps = {
  title: 'Currency',
};

const mapStateToProps = state => {
  return {
    currency: currencySelector(state),
    currencies: listCurrencySelector(state).toJS(),
  };
};

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(Currency);
