import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {TouchableOpacity, Image} from 'react-native';

import {listImageSelector} from 'src/modules/common/selectors';
import {homeDrawer} from 'src/config/navigator';

const Logo = ({images, navigation, ...rest}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(homeDrawer.home_tab)}>
      <Image source={images.logo} resizeMode="stretch" {...rest} />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {
    images: listImageSelector(state),
  };
};

export default connect(mapStateToProps)(withNavigation(Logo));
