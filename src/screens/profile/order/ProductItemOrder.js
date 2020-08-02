import React from 'react';
import {connect} from 'react-redux';

import {StyleSheet, View} from 'react-native';
import {Text, withTheme} from 'src/components';

import {getVariationId} from 'src/modules/product/service';
import currencyFormatter from 'src/utils/currency-formatter';

import {grey4} from 'src/components/config/colors';
import {margin, padding} from 'src/components/config/spacing';
import {languageSelector} from 'src/modules/common/selectors';

class ProductItemOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variation: null,
    };
  }

  componentDidMount() {
    const {item} = this.props;
    if (item && item.variation_id && item.variation_id !== 0) {
      this.getVariationData();
    }
  }

  getVariationData = async () => {
    try {
      const {item, language} = this.props;

      this.abortController = new AbortController();

      const variation = await getVariationId(
        item.product_id,
        item.variation_id,
        language,
        {
          signal: this.abortController.signal
        },
      );
      this.setState({
        variation,
      });
    } catch (e) {
      console.log(e);
    }
  };

  componentWillUnmount() {
    if (this.abortController) {
      this.this.abortController.abort();
    }
  }

  render() {
    const {item, style, theme, currency} = this.props;
    const {variation} = this.state;
    if (!item) {
      return null;
    }
    const isTax = parseFloat(item.total_tax) !== 0;
    return (
      <View
        style={[
          styles.container,
          {
            borderColor: theme.colors.border,
          },
          style && style,
        ]}
      >
        <Text colorSecondary style={styles.textName}>
          {item.name}
        </Text>
        {variation && variation.attributes && variation.attributes.length > 0 ? (
          <View style={styles.viewAttribute}>
            {variation.attributes.map(attribute => (
              <Text key={attribute.id} style={styles.textAttribute}>
                {`${attribute.name}: ${attribute.option}`}
              </Text>
            ))}
          </View>
        ) : null}
        <Text medium>
          {currencyFormatter(item.price, currency)} <Text colorSecondary>x {item.quantity}</Text>
        </Text>
        {isTax && (
          <Text colorSecondary style={styles.textTax}>
            Tax: <Text medium>{currencyFormatter(item.total_tax, currency)}</Text>
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: padding.large,
    marginBottom: margin.large,
    borderBottomWidth: 1,
  },
  textName: {
    marginBottom: margin.small,
  },
  viewAttribute: {
    marginBottom: margin.small,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textAttribute: {
    color: grey4,
    fontSize: 10,
    lineHeight: 15,
    marginRight: margin.small,
  },
  textTax: {
    marginTop: margin.small,
  },
});

const mapStateToProps = state => {
  return {
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTheme(ProductItemOrder));
