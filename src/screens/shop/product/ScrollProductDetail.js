import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

import { Animated, Platform, StyleSheet, StatusBar, View, Dimensions } from 'react-native';

import { Header, ThemedView, withTheme } from 'src/components';
import { CartIcon, IconHeader } from 'src/containers/HeaderComponent';

import { grey1, black } from 'src/components/config/colors';
import fonts, { sizes, lineHeights } from 'src/components/config/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const { width } = Dimensions.get('window');

const DEFAULT_HEIGHT_VIEW_IMAGE = (width * 440) / 375;
const HEADER_MIN_HEIGHT = getStatusBarHeight();

class ScrollProductDetail extends Component {
  constructor(props) {
    super(props);
    const { heightViewImage } = props;

    this.headerMaxHeight = heightViewImage <= HEADER_MIN_HEIGHT ? HEADER_MIN_HEIGHT : heightViewImage;
    this.headerScrollDistance = this.headerMaxHeight - HEADER_MIN_HEIGHT;

    this.state = {
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -this.headerMaxHeight : 0),
    };
  }

  render() {
    const { children, headerTitle, footerElement, theme } = this.props;
    const scrollY = Animated.add(this.state.scrollY, Platform.OS === 'ios' ? this.headerMaxHeight : 0);

    const viewImageTranslate = scrollY.interpolate({
      inputRange: [0, this.headerScrollDistance],
      outputRange: [0, -this.headerScrollDistance],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, this.headerScrollDistance / 2, this.headerScrollDistance],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });

    const headerColor = scrollY.interpolate({
      inputRange: [0, this.headerScrollDistance],
      outputRange: ['transparent', theme.colors.bgColor],
    });

    const titleColor = scrollY.interpolate({
      inputRange: [0, this.headerScrollDistance],
      outputRange: ['transparent', theme.Text.primary.color],
    });

    return (
      <ThemedView isFullView>
        <Animated.ScrollView
          style={styles.scrollview}
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
          contentInset={{
            top: this.headerMaxHeight,
          }}
          contentOffset={{
            y: -this.headerMaxHeight,
          }}
        >
          <View
            style={{
              paddingTop: Platform.OS !== 'ios' ? this.headerMaxHeight : 0,
            }}
          >
            {children}
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: imageOpacity,
              transform: [{ translateY: viewImageTranslate }],
              height: this.headerMaxHeight,
            },
          ]}
        >
          {this.props.imageElement}
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: headerColor,
            },
          ]}
        >
          <Header
            leftComponent={<IconHeader />}
            centerComponent={
              <Animated.Text numberOfLines={1} style={[styles.textHeading, { color: titleColor }]}>{headerTitle}</Animated.Text>
            }
            rightComponent={
              <CartIcon/>
            }
            containerStyle={styles.headerBar}
          />
        </Animated.View>
        {footerElement && footerElement}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerBar: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  textHeading: {
    color: black,
    lineHeight: lineHeights.h4,
    fontSize: sizes.h4,
    ...fonts.medium,
  },
});

ScrollProductDetail.defaultProps = {
  heightViewImage: DEFAULT_HEIGHT_VIEW_IMAGE,
};

export default withNavigation(withTheme(ScrollProductDetail));
