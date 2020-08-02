import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, View} from "react-native";
import {Icon, ThemeConsumer} from 'src/components';
import OpacityView from 'src/containers/OpacityView';
import {listImageSelector} from 'src/modules/common/selectors';

const AvatarOrderInfo = ({images}) => {
  return (
    <ThemeConsumer>
      {({theme}) => (
        <View>
          <View style={styles.viewBackground}>
            <OpacityView
              bgColor={theme.OrderInfo.avatarColor}
              opacity={theme.OrderInfo.avatarOpacity}
              style={styles.backgroundAvatar}
            />
          </View>
          <View style={styles.viewIcon}>
            <Icon
              name={'truck'}
              size={35}
              color={theme.colors.error}
              containerStyle={styles.icon}
            />
            <Image source={images.wave} resizeMode="stretch" style={styles.imageWave}/>
          </View>
        </View>
      )}
    </ThemeConsumer>
  )
};

const styles = StyleSheet.create({
  viewBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  backgroundAvatar: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
  },
  viewIcon: {
    height: 95,
    justifyContent: 'center',
  },
  icon: {
    marginTop: 8.5
  },
  imageWave: {
    marginTop: -3,
    height: 17
  },
});

const mapStateToProps = state => {
  return {
    images: listImageSelector(state),
  };
};

export default connect(mapStateToProps)(AvatarOrderInfo);
