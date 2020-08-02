import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Icon, withTheme } from 'src/components';

import { LIST_SWITCH_PRODUCT } from 'src/modules/common/constants';
import { switchProductView } from 'src/modules/common/actions';
import { productViewSelector } from 'src/modules/common/selectors';

import { margin } from 'src/components/config/spacing';

const SwitchProduct = ({ theme, productView, switchView }) => {
  const selectIcon = theme.SwitchProduct.selectColor;
  const noneSelectIcon = theme.SwitchProduct.color;

  return (
    <View style={styles.container}>
      {LIST_SWITCH_PRODUCT.map(value => (
        <Icon
          key={value.icon}
          name={value.icon}
          type="feather"
          size={17}
          color={value.view === productView ? selectIcon : noneSelectIcon}
          underlayColor="transparent"
          iconStyle={[styles.touch, styles.icon]}
          onPress={() => switchView(value.view)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: margin.small,
  },
});
const mapStateToProps = state => {
  return {
    productView: productViewSelector(state),
  };
};
const mapDispatchToProps = dispatch => ({
  switchView: view => dispatch(switchProductView(view)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(SwitchProduct));
