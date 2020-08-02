import PropTypes from 'prop-types';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar} from 'src/components';
import {SystemMessage} from 'react-native-gifted-chat';
import {isSameUser} from 'react-native-gifted-chat/lib/utils';
import Bubble from './Bubble';
import Time from './Time';
import Day from './Day';

import {isSameTime} from './utils';
import {margin} from 'src/components/config/spacing';

const styleTime = {
  marginBottom: margin.small + 1,
  marginTop: 3,
};

const styleView = {
  marginHorizontal: margin.large,
};

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    time: {
      marginLeft: 35,
      ...styleTime,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    time: {
      ...styleTime,
    },
  }),
};
export default class Message extends React.Component {
  shouldComponentUpdate(nextProps) {
    const next = nextProps.currentMessage;
    const current = this.props.currentMessage;
    const {previousMessage, nextMessage} = this.props;
    const nextPropsMessage = nextProps.nextMessage;
    const nextPropsPreviousMessage = nextProps.previousMessage;
    const shouldUpdate =
      (this.props.shouldUpdateMessage &&
        this.props.shouldUpdateMessage(this.props, nextProps)) ||
      false;
    return (
      next.sent !== current.sent ||
      next.received !== current.received ||
      next.pending !== current.pending ||
      next.createdAt !== current.createdAt ||
      next.text !== current.text ||
      next.image !== current.image ||
      next.video !== current.video ||
      next.audio !== current.audio ||
      previousMessage !== nextPropsPreviousMessage ||
      nextMessage !== nextPropsMessage ||
      shouldUpdate
    );
  }

  renderDay() {
    if (this.props.currentMessage && this.props.currentMessage.createdAt) {
      return <Day {...this.props} />;
    }
    return null;
  }

  renderBubble() {
    return <Bubble {...this.props} />;
  }

  renderSystemMessage() {
    return <SystemMessage {...this.props} />;
  }

  renderAvatar() {
    const {currentMessage, nextMessage} = this.props;

    if (
      isSameUser(currentMessage, nextMessage) &&
      isSameTime(currentMessage, nextMessage)
    ) {
      return <View style={{width: 35, height: 30}} />;
    }
    return (
      <Avatar
        size={30}
        rounded
        source={
          currentMessage && currentMessage.user && currentMessage.user.avatar
            ? {uri: currentMessage.user.avatar}
            : require('src/assets/images/pDefault.png')}
        containerStyle={{marginRight: 5}}
      />
    );
  }

  renderTime() {
    const {currentMessage, nextMessage, position, timeFormat} = this.props;
    if (
      currentMessage &&
      nextMessage &&
      position &&
      (!isSameUser(currentMessage, nextMessage) ||
        (isSameUser(currentMessage, nextMessage) &&
          !isSameTime(currentMessage, nextMessage)))
    ) {
      return (
        <View style={styles[position].time}>
          <Time
            currentMessage={currentMessage}
            position={position}
            timeFormat={timeFormat}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const {currentMessage, position} = this.props;
    if (currentMessage) {
      return (
        <View style={styleView}>
          {this.renderDay()}
          {currentMessage.system ? this.renderSystemMessage() : (
            <View>
              <View style={[styles[position].container, {marginBottom: 3}]}>
                {this.props.position === 'left' ? this.renderAvatar() : null}
                {this.renderBubble()}
              </View>
              {this.renderTime()}
            </View>
          )}
        </View>
      );
    }
    return null;
  }
}
Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  renderSystemMessage: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  shouldUpdateMessage: undefined,
};
Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  renderSystemMessage: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  shouldUpdateMessage: PropTypes.func,
};
//# sourceMappingURL=Message.js.map
