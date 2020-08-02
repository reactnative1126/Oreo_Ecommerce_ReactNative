import React, {PureComponent} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import Container from 'src/containers/Container';
import MultiSlider from 'src/containers/MultiSlider';
import CustomMarker from 'src/containers/MultiSlider/CustomMarker';
import ViewRefine from './containers/ViewRefine';

import {
  currencySelector,
  listCurrencySelector,
  defaultCurrencySelector,
} from 'src/modules/common/selectors';
import {
  filterBySelector,
  priceRangesSelector,
} from 'src/modules/product/selectors';
import {filterByProduct} from 'src/modules/product/actions';

import {mainStack} from 'src/config/navigator';

const {width} = Dimensions.get('window');

const WIDTH_MULTI_SLIDER = width - 112;

class FilterPrice extends PureComponent {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props, context) {
    super(props, context);
    const {
      filterBy,
      min,
      max,
      currency,
      defaultCurrency,
      currencies,
    } = this.props;

    const findCurrency = currencies.get(currency);
    const rate =
      currency !== defaultCurrency &&
      findCurrency &&
      parseFloat(findCurrency.get('rate')) > 0
        ? parseFloat(findCurrency.get('rate'))
        : 1;

    const min_price =
      filterBy.get('min_price') === '' ? min : filterBy.get('min_price');
    const max_price =
      filterBy.get('max_price') === '' ? max : filterBy.get('max_price');

    this.state = {
      values: [parseInt(min_price) * rate, parseInt(max_price) * rate],
      rate: rate,
    };
  }

  onValuesChange = values => {
    this.setState({
      values,
    });
  };

  showResult = () => {
    const {filterBy, navigation, filterByProduct, dataRanger} = this.props;
    const {values, rate} = this.state;

    let newFilter = filterBy.set('min_price', values[0] / rate).set('max_price', values[1] / rate);

    // Keep price rangers in the first time
    if (filterBy.get('min') === '' || filterBy.get('max') === '') {
      newFilter = newFilter.set('min', dataRanger.min).set('max', dataRanger.max);
    }

    filterByProduct(newFilter);
    navigation.navigate(mainStack.products, {filterBy: newFilter});
  };

  clearAll = () => {
    const {min, max} = this.props;
    this.setState({
      values: [parseInt(min), parseInt(max)],
    });
  };

  render() {
    const {
      min,
      max,
      currency,
      screenProps: {t},
    } = this.props;
    const {rate, values} = this.state;
    return (
      <ViewRefine titleHeader={t('catalog:text_price_range')} handleResult={this.showResult} clearAll={this.clearAll}>
        <Container>
          <View style={styles.viewMultiSlider}>
            <MultiSlider
              values={values}
              sliderLength={WIDTH_MULTI_SLIDER}
              onValuesChange={this.onValuesChange}
              min={min * rate}
              max={max * rate}
              step={1}
              allowOverlap={false}
              snapped
              minMarkerOverlapDistance={40}
              customMarker={CustomMarker}
              typeCurrency={currency}
              isCurrency
            />
          </View>
        </Container>
      </ViewRefine>
    );
  }
}

const styles = StyleSheet.create({
  viewMultiSlider: {
    marginTop: 50,
    marginHorizontal: 40,
  },
});

const mapDispatchToProps = {
  filterByProduct,
};

const mapStateToProps = state => {
  const {min, max} = priceRangesSelector(state);
  return {
    filterBy: filterBySelector(state),
    min: parseInt(min),
    max: parseInt(max) + 1,
    dataRanger: {min, max},
    currency: currencySelector(state),
    currencies: listCurrencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPrice);
