import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, withTheme } from 'src/components';
import Input from 'src/containers/input/InputBasic';
import { MIN_HEIGHT } from 'src/containers/ViewLabel';

import { addCoupon } from 'src/modules/cart/actions';
import { listImageSelector } from 'src/modules/common/selectors';
import { margin, padding, borderRadius } from 'src/components/config/spacing';

class InputCoupon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couponValue: '',
      error: null
    }
  }
  clickApply = () => {
    const { dispatch } = this.props;
    const { couponValue } = this.state;
    if (couponValue.length >= 4) {
      dispatch(addCoupon(couponValue));
      this.setState({
        couponValue: '',
      });
    }

  };

  render() {
    const { images, theme, t } = this.props;
    const { couponValue } = this.state;
    const couponTrue = couponValue.length > 3;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.border,
            borderColor: theme.colors.border
          }
        ]}
      >
        <View style={[
          styles.viewInput,
          { backgroundColor: theme.colors.bgColor }
          ]}>
          <Image
            source={images.coupon}
            resizeMode='stretch'
            style={styles.image}
          />
          <Input
            value={couponValue}
            onChangeText={(value) => this.setState({ couponValue: value})}
            style={[
              styles.input,
              { color: theme.colors.primary }
            ]}
            placeholder={t('cart:text_coupon_input')}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.viewButton,
            {
              backgroundColor: theme.colors.bgColor,
            }
          ]}
          onPress={this.clickApply}
          activeOpacity={couponTrue ? 0.8 : 1}
        >
          <Text
            colorSecondary={!couponTrue}
            medium={couponTrue}
          >{t('common:text_apply')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: MIN_HEIGHT,
    borderWidth: 1,
    borderRadius: borderRadius.base,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewInput: {
    flex: 1,
    height: '100%',
    marginRight: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    marginLeft: margin.small + 1
  },
  input: {
    height: '100%',
    flex: 1,
    paddingHorizontal: padding.large - 2,
  },
  viewButton: {
    paddingHorizontal: padding.large - 1,
    height: '100%',
    justifyContent: 'center'
  }
});
const mapStateToProps = state => {
  return {
    images: listImageSelector(state),
  }
};

export default compose(
  withTranslation(),
  withTheme,
  connect(mapStateToProps)
)(InputCoupon)
