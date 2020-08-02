import React from 'react';
import {fromJS} from 'immutable';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'src/components';
import Option from './OptionVariable';
import {checkOption} from 'src/modules/product/helper';
import {margin} from 'src/components/config/spacing';

class AttributeVariable extends React.Component {
  onSelectOption = (option) => {
    const {onSelectAttribute, attribute} = this.props;
    onSelectAttribute(attribute.get('id'), attribute.get('name'), option.get('option'));
  };
  render() {
    const {attribute, meta_data, variations} = this.props;
    // Attribute selected
    const attributeSelected = meta_data.find(attr => attr.get('id') === attribute.get('id') && attr.get('name') === attribute.get('name'));

    return (
      <>
        <Text>
          {attribute.get('name')}: <Text colorSecondary>{attributeSelected ? attributeSelected.get('option') : ''}</Text>
        </Text>
        <ScrollView
          style={styles.attribute}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {attribute.get('options').map(option => {
            const disabled = !checkOption(variations, meta_data, fromJS({
              id: attribute.get('id'),
              name: attribute.get('name'),
              option: option.get('option'),
            }));

            return (
              <TouchableOpacity
                activeOpacity={disabled ? 1 : 0}
                key={option}
                onPress={() => disabled ? {} : this.onSelectOption(option)}
              >
                <Option
                  type={attribute.get('type')}
                  selected={attributeSelected && option.get('option') === attributeSelected.get('option')}
                  disabled={disabled}
                  option={option}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>

      </>
    );
  }
}
const styles = StyleSheet.create({
  attribute: {
    marginTop: margin.small,
  },
});

export default AttributeVariable;
