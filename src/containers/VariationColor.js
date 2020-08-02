// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme, Icon } from 'src/components';

type Props = {
  theme: {},
  isSelect?: boolean,
  color: string,
  disabled?: boolean,
};

class VariationColor extends React.Component<Props> {
  render() {
    const { theme, isSelect, color, disabled } = this.props;
    const borderColor = isSelect ? theme.colors.primary : theme.colors.grey1;
    return (
      <View
        style={[
          styles.box,
          {
            borderWidth: isSelect ? 2 : 1,
            borderColor: borderColor,
          },
          color && {
            backgroundColor: color,
          },
          disabled && styles.disabled,
        ]}
      >
        {isSelect && color && <Icon name="check" type="feather" color="white" size={20} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});

VariationColor.defaultProps = {
  isSelect: false,
  disabled: false,
};

export default withTheme(VariationColor);
