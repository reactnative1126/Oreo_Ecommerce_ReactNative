import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, ThemedView} from 'src/components';

import {margin, borderRadius} from 'src/components/config/spacing';

type Props = {
  value?: number,
  onChange?: (value: number) => void,
  style: {},
};

const Quantity = (props: Props): React.Node => {
  const {value, onChange, style} = props;
  return (
    <ThemedView style={[styles.container, style && style]} colorSecondary>
      <Text style={styles.text}>{value}</Text>
      <TouchableOpacity
        style={[styles.touch, styles.left]}
        onPress={() => onChange(value - 1)}>
        <Text h4 medium>
          -
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.touch, styles.right]}
        onPress={() => onChange(value + 1)}>
        <Text h4 medium>
          +
        </Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

Quantity.defaultProps = {
  value: 1,
  onChange: () => {},
};

const styles = StyleSheet.create({
  container: {
    minWidth: 86,
    borderRadius: borderRadius.base,
    overflow: 'hidden',
  },
  touch: {
    width: margin.big,
    height: '100%',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    left: 0,
    paddingLeft: 4,
  },
  right: {
    right: 0,
    paddingRight: 4,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: margin.big,
    paddingVertical: 4,
  },
});

export default Quantity;
