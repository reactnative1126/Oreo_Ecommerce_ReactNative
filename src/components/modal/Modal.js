
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import Icon  from '../icons/Icon';
import { withTheme }  from '../config';
import { padding, borderRadius } from '../config/spacing';

const { height: heightWindow } = Dimensions.get('window');

const getHeightView = (heightFull = heightWindow, ratio = 0.5) => {
    const getRatio = ratio < 0.5 || ratio > 1 ? 0.5: ratio;
    return (heightFull)*getRatio;
};

class ModalSelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0),
      height: getHeightView(heightWindow,props.ratio),
    };
  }

  animation = (type = 'open', cb = () => {}) => {
    const toValue = type === 'open' ? 0.5 : 0;
    const duration = 350;
    Animated.timing(this.state.opacity, {
      toValue,
      duration,
    }).start(cb);
  };

  onShow = () => {
    this.animation();
  };

  componentDidUpdate(preProps) {
    const { visible } = this.props;
    // Close
    if (!visible && preProps.visible !== visible) {
      this.animation('close', () => this.setState({ visible }));
    }
    // Open
    if (visible && preProps.visible !== visible) {
      this.setState({ visible });
    }
  }

  render() {
    const { theme, topLeftElement, topRightElement, underTopElement, ratioHeight, children, setModalVisible, backgroundColor } = this.props;
    const { opacity, visible, height } = this.state;

    const topLeft = topLeftElement ? (
      topLeftElement
    ) : (
      <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 2 }}>
        <Icon name="x" type="feather" size={18} />
      </TouchableOpacity>
    );

    const topRight = topRightElement ? topRightElement : null;

    const bottom = opacity.interpolate({
      inputRange: [0, 0.5],
      outputRange: [-height, 0],
    });

    return (
      <Modal transparent visible={visible} onShow={this.onShow}>
        <View style={styles.container} onLayout={(event) => {
          let {height: heightFull} = event.nativeEvent.layout;
          this.setState({
            height: getHeightView(heightFull, ratioHeight),
          });
        }}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: theme.colors.black,
              opacity: opacity,
            }}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)} />
          </Animated.View>
          <Animated.View
            style={[
              styles.modal,
              {
                height: height,
                backgroundColor: backgroundColor,
                bottom: bottom,
              },
            ]}
          >
            {/*Header*/}
            <View style={styles.header}>
              {topLeft}
              {topRight}
            </View>

            {underTopElement}

            {/*Content*/}
            <View style={{ flex: 1 }}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    borderTopLeftRadius: borderRadius.big,
    borderTopRightRadius: borderRadius.big,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    padding: padding.big - 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

ModalSelect.propTypes = {
  visible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  ratioHeight: PropTypes.number,
  topRightElement: PropTypes.node,
};

ModalSelect.defaultProps = {
  topBottomElement: null,
  visible: false,
  ratioHeight: 0.5,
};

export default withTheme(ModalSelect, 'Modal');
