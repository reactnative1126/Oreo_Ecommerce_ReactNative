import React from 'react';
import {Map} from 'immutable';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'src/components';
import AttributeVariable from './AttributeVariable';

import {prepareAttributes, findVariation} from 'src/modules/product/helper';
import {margin} from 'src/components/config/spacing';

class ProductVariable extends React.Component {
  handleChange = meta_data => {
    const {onChange, productAttributes, productVariations} = this.props;
    const attributes = productAttributes.filter(attr => attr.get('variation'));
    // get variation id when all attribute selected
    if (meta_data.size && attributes.size === meta_data.size) {
      const find = findVariation(productVariations, meta_data);
      if (find) {
        onChange('variation', find);
      }
    }

    onChange('meta_data', meta_data);
  };

  onClear = () => {
    const {onChange, meta_data} = this.props;
    onChange('meta_data', meta_data.clear());
    onChange('variation', Map());
  };

  /**
   * Select attribute option
   * @param attribute_id: attribute id
   * @param attribute_name: attribute name
   * @param attribute_option: attribute option
   * @param attribute_option_name: attribute option name
   */
  onSelectAttribute = (
    attribute_id,
    attribute_name,
    attribute_option,
  ) => {
    // console.log('test', typeof attribute_id, attribute_name, attribute_option)
    const {meta_data} = this.props;
    const option = Map({
      id: attribute_id,
      name: attribute_name,
      option: attribute_option,
    });
    // Get index option in meta data
    const index = meta_data.findIndex(
      attr =>
        attr.get('id') === attribute_id && attr.get('name') === attribute_name,
    );

    // Already exist in meta data
    if (index >= 0 && meta_data.includes(option)) {
      this.handleChange(meta_data.delete(index));
    } else if (index >= 0) {
      // else replace attribute
      this.handleChange(meta_data.set(index, option));
    } else {
      this.handleChange(meta_data.push(option));
    }
  };

  render() {
    const {
      meta_data,
      productAttributes,
      productVariations,
      attribute,
      loading,
    } = this.props;

    if (loading) {
      return <ActivityIndicator />;
    }
    // Prepare attributes
    const attributes = prepareAttributes(
      productAttributes.filter(attr => attr.get('variation')),
      attribute,
      productVariations,
    );

    return (
      <View>
        {attributes.map((att, index) => (
          <View
            key={`${att.get('id')}-${att.get('position')}`}
            style={index < attributes.size - 1 && styles.atr}>
            <AttributeVariable
              meta_data={meta_data}
              attribute={att}
              variations={productVariations}
              onSelectAttribute={this.onSelectAttribute}
            />
          </View>
        ))}
        <TouchableOpacity onPress={this.onClear} style={styles.viewClear}>
          <Text h6 colorThird>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewClear: {
    position: 'absolute',
    top: 1,
    right: 0,
  },
  atr: {
    marginBottom: margin.large,
  },
});

export default ProductVariable;
