import React from 'react';
import {StyleSheet, View} from 'react-native';
import VariationColor from 'src/containers/VariationColor';
import VariationImage from 'src/containers/VariationImage';
import VariationButton from 'src/containers/VariationButton';
import {margin} from 'src/components/config/spacing';

const Option = props => {
  const {option, selected, disabled, type} = props;

  if (type === 'color') {
    return (
      <View style={styles.margin}>
        <VariationColor
          color={option.get('value')}
          disabled={disabled}
          isSelect={selected}
        />
      </View>
    );
  }

  if (type === 'image') {
    return (
      <View style={styles.margin}>
        <VariationImage
          image={option.get('value')}
          disabled={disabled}
          isSelect={selected}
        />
      </View>
    );
  }

  return (
    <View style={styles.margin}>
      <VariationButton
        title={option.get('name')}
        disabled={disabled}
        isSelect={selected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginRight: margin.large,
  },
});

export default Option;
