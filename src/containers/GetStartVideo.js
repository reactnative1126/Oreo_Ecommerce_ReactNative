import React from 'react';

import {withTranslation} from 'react-i18next';

import Video from "react-native-video";
import {StyleSheet, View, Dimensions, Image, Platform} from 'react-native';
import {Text} from 'src/components';
import OpacityView from 'src/containers/OpacityView';
import Button from 'src/containers/Button';

import {black, white} from 'src/components/config/colors';

import {authStack} from 'src/config/navigator';
import NavigationServices from 'src/utils/navigation';

const {width, height} = Dimensions.get('window');

const ENABLE_IMAGE_IOS = false;

class GetStartVideo extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {scrollX: new Animated.Value(0), height: 0};
  // }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'android' || ENABLE_IMAGE_IOS ? <Image
          source={require('src/assets/images/getting-start/bg.png')}
          style={{width, height}}
          resizeMode="cover"
        /> :
        <Video
          source={require("src/assets/video/background.mp4")}
          muted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
          style={styles.backgroundVideo}
        />}
        <View style={styles.bg}/>
        <OpacityView bgColor={black} opacity={0.3} style={styles.bg}>
          <Image
            source={require('src/assets/images/logo-dark.png')}
            style={styles.logo}
          />
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View style={styles.bottomBig}>
                <Text h1 medium style={[styles.text, styles.bottom]}>User Experience</Text>
                <Text style={[styles.text, {lineHeight: 23}]}>Sign in to receive exclusive offers and Promotions</Text>
              </View>
              <View style={styles.bottomBig}>
                <Button
                  title="Create Account"
                  buttonStyle={styles.buttonRegister}
                  titleStyle={styles.textButtonRegister}
                  containerStyle={styles.bottom}
                  onPress={() =>
                    NavigationServices.navigate(authStack.register)
                  }
                />
                <Button
                  title="Login"
                  type="outline"
                  buttonStyle={styles.buttonSignIn}
                  titleStyle={styles.text}
                  onPress={() => NavigationServices.navigate(authStack.login)}
                />
              </View>
            </View>
          </View>
        </OpacityView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: getStatusBarHeight(),
  },
  backgroundVideo: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width,
    height,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {
    marginBottom: 20,
  },
  bottomBig: {
    marginBottom: 100,
  },
  text: {
    color: white,
    textAlign: 'center',
  },
  logo: {
    marginTop: 43,
  },
  footer: {
    width: '100%',
  },
  footerContent: {
    marginHorizontal: 36,
  },
  buttonRegister: {
    borderColor: white,
    backgroundColor: white,
  },
  textButtonRegister: {
    color: black,
  },
  buttonSignIn: {
    borderColor: white,
  },
});

export default withTranslation()(GetStartVideo);
