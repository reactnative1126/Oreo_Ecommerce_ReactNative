// @flow
import React from 'react';

import { TouchableOpacity, Animated } from 'react-native';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation, NavigationScreenProps } from 'react-navigation';

import { Badge, Icon } from 'src/components';
// import Icon from 'react-native-vector-icons/Feather';

import { homeTabs } from 'src/config/navigator';

import { cartSizeSelector } from 'src/modules/cart/selectors';
import { configsSelector } from 'src/modules/common/selectors';

type Props = {
  value: number,
  isAnimated: boolean,
  navigation: NavigationScreenProps,
};

class CartIcon extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1),
    };
  }
  UNSAFE_componentWillMount() {
    if (this.props.isAnimated) {
      this.animated();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value < this.props.value) {
      this.animated();
    }
  }
  animated = () => {
    const { scale } = this.state;
    const toValue = scale._value === 1 ? 1.5 : 1;
    Animated.timing(scale, {
      toValue: toValue,
    }).start(() => {
      if (toValue === 1.5) {
        this.animated();
      }
    });
  };
  render() {
    const { value, iconProps, navigation, configs } = this.props;
    const heightBadge = 16;

    const badgeStyle = {
      borderRadius: heightBadge / 2,
      minWidth: heightBadge,
    };

    const textStyle = {
      textAlign: 'center',
      fontSize: 8,
    };
    if (!configs.get('toggleCheckout')) {
      return null
    }
    return (
      <TouchableOpacity onPress={() => navigation.navigate(homeTabs.cart)} style={{ flexDirection: 'row', alignItems: 'center', padding: 6}}>
        <Animated.View style={{
          transform: [{ scale: this.state.scale }],
          zIndex: 9999
        }}>
          <Badge
            status="error"
            badgeStyle={badgeStyle}
            textStyle={textStyle}
            value={value}
          />
        </Animated.View>
        <Icon name="shopping-bag" size={20} {...iconProps} />
      </TouchableOpacity>
    )
  }
}

CartIcon.defaultProps = {
  value: 0,
  isAnimated: false,
  iconProps: {},
};

const mapStateToProps = state => ({
  value: cartSizeSelector(state),
  configs: configsSelector(state),
});

export default compose(
  withNavigation,
  connect(mapStateToProps)
)(CartIcon);
