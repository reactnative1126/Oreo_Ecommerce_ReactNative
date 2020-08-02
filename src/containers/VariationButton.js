// @flow
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, Text} from 'src/components';

import {margin, borderRadius} from 'src/components/config/spacing';

type Props = {
  theme: {},
  isSelect: boolean,
  title: string,
  disabled: boolean,
};

const VariationButton = (props: Props) => {
  const {theme, title, isSelect, disabled} = props;
  const borderColor = !isSelect ? 'transparent' : theme.colors.primary;
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: !isSelect ? theme.colors.border : theme.colors.primary,
        },
        disabled && styles.disabled,
      ]}>
      <View
        style={[
          styles.content,
          {
            borderColor,
          },
        ]}>
        <Text medium style={styles.text}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.base,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.4,
  },
  content: {
    borderRadius: borderRadius.base - 1,
    borderWidth: 1,
  },
  text: {
    lineHeight: 18,
    marginVertical: margin.small,
    marginHorizontal: margin.base,
  },
});

VariationButton.defaultProps = {
  isSelect: false,
  disabled: false,
};

export default withTheme(VariationButton);
