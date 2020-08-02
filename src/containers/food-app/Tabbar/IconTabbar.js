import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Icon} from 'src/components';
import {Dot} from 'src/containers/Pagination';
import {red} from 'src/components/config/colors';

import {wishListSelector} from 'src/modules/common/selectors';
import {selectCartList} from 'src/modules/cart/selectors';

class IconTabbar extends React.Component {
  render() {
    const { nameData, cart, wishList, ...rest } = this.props;

    const isDot = nameData === 'cart' ? cart.size : nameData === 'wishList' ? wishList.size : 0 ;

    return (
      <View>
        <Icon
          name='home'
          size={22}
          {...rest}
        />
        {isDot ? <Dot
          size={9}
          color={red}
          style={{
            position: 'absolute',
            right: -1,
            bottom: 0
          }}
        />: null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  wishList: wishListSelector(state),
  cart: selectCartList(state),
});

export default connect(mapStateToProps, null)(IconTabbar)
