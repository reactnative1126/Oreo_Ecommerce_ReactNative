import React from 'react';

import { connect } from 'react-redux';

import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar, ThemeConsumer } from 'src/components';
import InputCoupon from './InputCoupon';

import { margin } from 'src/components/config/spacing';
import { couponLinesSelector } from 'src/modules/cart/selectors';
import { removeCoupon } from 'src/modules/cart/actions';

class CartScreen extends React.Component {

  removeCoupon = code => {
    const { dispatch } = this.props;
    dispatch(removeCoupon(code));
  };

  render() {
    const { coupon_lines } = this.props;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <View style={styles.viewCode}>
            <InputCoupon />
            {coupon_lines.map(coupon => (
              <ListItem
                key={coupon.get('code')}
                title={coupon.get('code').toUpperCase()}
                type="underline"
                leftIcon={
                  <Avatar
                    icon={{
                      name: 'percent',
                      size: 14
                    }}
                    rounded
                    size={25}
                    overlayContainerStyle={{ backgroundColor: theme.colors.error}}
                  />
                }
                rightIcon={{
                  name: 'x',
                  size: 19,
                  onPress: () => this.removeCoupon(coupon.get('code')),
                }}
                titleProps={{
                  h6: true,
                  medium: true
                }}
                containerStyle={styles.couponContainer}
              />
            ))}
          </View>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  viewCode: {
    marginVertical: margin.large,
  },
  couponContainer: {
    minHeight: 0,
    borderBottomWidth: 0,
    marginTop: margin.small + 1
  },
});

CartScreen.defaultProps = {
  placeholder: 'Coupon code',
  applyButtonTitle: 'Apply',
};

const mapStateToProps = state => {
  return {
    coupon_lines: couponLinesSelector(state),
  };
};

export default connect(mapStateToProps)(CartScreen);
