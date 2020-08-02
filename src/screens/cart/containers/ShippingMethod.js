import React from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import forEach from 'lodash/forEach';
import { connect } from 'react-redux';

import { Text } from 'src/components';
import ChooseItem from 'src/containers/ChooseItem';

import { getContinentCode, getZones } from 'src/modules/cart/service';
import { shippingMethodNotCoveredByZoneSelector, currencySelector, defaultCurrencySelector, listCurrencySelector } from 'src/modules/common/selectors';

import currencyFormatter from 'src/utils/currency-formatter';

import { margin, padding } from 'src/components/config/spacing';
import { red, blue, teal, yellow, pink, olive, orange, violet, purple, brown } from 'src/components/config/colors';
import { calcCost } from 'src/utils/product';

const color = [red, blue, teal, yellow, pink, olive, orange, violet, purple, brown];

class ShippingMethod extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      data: [],
    };
  }

  componentDidMount() {
    const { cc } = this.props;
    this.getShipping(cc);
  }

  componentDidUpdate(prevProps) {
    const { cc } = this.props;
    if (cc !== prevProps.cc) {
      this.getShipping(cc);
    }
  }

  /**
   * Get shipping methods
   * @param cc: country code
   * @returns {Promise<void>}
   */
  getShipping = async cc => {
    try {
      if (cc) {
        this.setState({
          loading: true,
        });

        const continent = await getContinentCode(cc);
        const zones = await getZones();
        let check = [];

        forEach(zones, ({ zone_locations, shipping_methods }) => {
          // Check Zone regions
          check = zone_locations.filter(({ code, type }) => {
            if ((type === 'continent' && code === continent) || (type === 'country' && code === cc)) {
              return true;
            }
            return false;
          });

          if (check.length) {
            this.setState({
              loading: false,
              data: shipping_methods,
            });
            // exist forEach
            return false;
          }
        });

        if (!check.length) {
          const { methodsNotCoveredByZone } = this.props;
          const { loading, data } = methodsNotCoveredByZone.toJS();
          this.setState({
            loading,
            data,
          });
        }
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false,
      })
    }
  };

  // Get currency by rate
  getCurrencyByRate = (cost) => {
    const { currencies, defaultCurrency, currency } = this.props;
    const currencyData = currencies.get(currency);

    // calc rate when user change currency
    if (currency !== defaultCurrency) {
      return currencyData.get('rate') * cost;
    }
    return cost;
  };

  // render shipping method
  renderItem = ({ item, index }) => {
    const { onChangeShippingMethod, selected, currency } = this.props;
    const cost = calcCost(item);
    const rate = this.getCurrencyByRate(cost);
    const topElement = (
      <Text h3 medium>
        {currencyFormatter(rate, currency)}
      </Text>
    );
    const bottomElement = (
      <View style={styles.footerItem}>
        <Text h5 medium style={{ color: color[index], marginRight: margin.base }}>
          {item.method_title}
        </Text>
        {/*<Text h6 colorThird>*/}
        {/*  10 days*/}
        {/*</Text>*/}
      </View>
    );
    return (
      <ChooseItem
        item={item}
        onPress={onChangeShippingMethod}
        active={selected && item.id === selected.get('id')}
        topElement={topElement}
        bottomElement={bottomElement}
        containerStyle={styles.containerItem}
        style={styles.item}
        key={item.id}
      />
    );
  };

  render() {
    const { cc, methodsNotCoveredByZone } = this.props;
    const { loading, data } = cc ? this.state : methodsNotCoveredByZone.toJS();

    return (
      <View style={styles.container}>
        {!loading ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => this.renderItem({ item, index }))}
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: margin.big,
  },
  item: {
    paddingVertical: padding.base,
  },
  containerItem: {
    marginRight: margin.base,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
  },
});

ShippingMethod.defaultprops = {};

const mapStateToProps = state => ({
  methodsNotCoveredByZone: shippingMethodNotCoveredByZoneSelector(state),
  currency: currencySelector(state),
  defaultCurrency: defaultCurrencySelector(state),
  currencies: listCurrencySelector(state),
});

export default connect(mapStateToProps)(ShippingMethod);
