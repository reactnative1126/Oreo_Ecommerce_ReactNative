import PropTypes from 'prop-types';
import React from 'react';
import {
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {MessageImage} from 'react-native-gifted-chat';
import {isSameUser} from 'react-native-gifted-chat/lib/utils';
import MessageText from './MessageText';

import {borderRadius, padding} from 'src/components/config/spacing';

import {isSameTime} from './utils';
const Color = {
  leftBubbleBackground: '#e9ecef',
  defaultBlue: '#6435c9',
  backgroundTransparent: 'yellow',
  white: 'white',
};
const radius = borderRadius.large + 4;

const styleWrapper = {
  borderRadius: radius,
  paddingVertical: padding.base + 1,
  paddingHorizontal: padding.large,
  justifyContent: 'flex-end',
  minHeight: 40,
};

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      backgroundColor: Color.leftBubbleBackground,
      marginRight: 60,
      ...styleWrapper,
      borderBottomLeftRadius: 0,
    },
    containerToNext: {
      borderBottomLeftRadius: 0,
    },
    containerToPrevious: {
      borderTopLeftRadius: 0,
    },
    containerEndTime: {
      borderBottomLeftRadius: radius,
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      backgroundColor: Color.defaultBlue,
      marginLeft: 60,
      ...styleWrapper,
      borderBottomRightRadius: 0,
    },
    containerToNext: {
      borderBottomRightRadius: 0,
    },
    containerToPrevious: {
      borderTopRightRadius: 0,
    },
    containerEndTime: {
      borderBottomRightRadius: radius,
    },
  }),
};
const DEFAULT_OPTION_TITLES = ['Copy Text', 'Cancel'];
export default class Bubble extends React.Component {
  constructor() {
    super(...arguments);
    this.onLongPress = () => {
      const {currentMessage} = this.props;
      if (this.props.onLongPress) {
        this.props.onLongPress(this.context, this.props.currentMessage);
      } else if (currentMessage && currentMessage.text) {
        const {optionTitles} = this.props;
        const options =
          optionTitles && optionTitles.length > 0
            ? optionTitles.slice(0, 2)
            : DEFAULT_OPTION_TITLES;
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(currentMessage.text);
                break;
              default:
                break;
            }
          },
        );
      }
    };
  }

  styledBubbleToNext() {
    const {currentMessage, nextMessage, position,} = this.props;
    if (
      currentMessage &&
      nextMessage &&
      position &&
      isSameUser(currentMessage, nextMessage) &&
      isSameTime(currentMessage, nextMessage)
    ) {
      return styles[position].containerToNext;
    }
    return null;
  }

  styledBubbleToPrevious() {
    const {currentMessage, previousMessage, position} = this.props;
    if (
      currentMessage &&
      previousMessage &&
      position &&
      isSameUser(currentMessage, previousMessage) &&
      isSameTime(currentMessage, previousMessage)
    ) {
      return styles[position].containerToPrevious;
    }
    return null;
  }

  styledBubbleEndTime() {
    const {currentMessage, previousMessage, nextMessage, position} = this.props;
    if (
      currentMessage &&
      nextMessage &&
      previousMessage &&
      position &&
      isSameUser(currentMessage, previousMessage) &&
      isSameTime(currentMessage, previousMessage) &&
      (!isSameUser(currentMessage, nextMessage) ||
        !isSameTime(currentMessage, nextMessage))
    ) {
      return styles[position].containerEndTime;
    }
    return null;
  }

  renderMessageText() {
    const {currentMessage, position} = this.props;
    if (currentMessage && currentMessage.text) {
      return (
        <MessageText currentMessage={currentMessage} position={position} />
      );
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage && this.props.currentMessage.image) {
      return <MessageImage {...this.props} />;
    }
    return null;
  }

  renderMessageVideo() {
    if (this.props.currentMessage && this.props.currentMessage.video) {
      // const {containerStyle, wrapperStyle, ...messageVideoProps} = this.props;
      // if (this.props.renderMessageVideo) {
      //   return this.props.renderMessageVideo(messageVideoProps);
      // }
      return null;
      // return <MessageVideo {...messageVideoProps}/>;
    }
    return null;
  }

  renderBubbleContent() {
    return (
      <View>
        {this.renderMessageImage()}
        {this.renderMessageVideo()}
        {this.renderMessageText()}
      </View>
    );
  }

  render() {
    const {position} = this.props;
    return (
      <View style={styles[position].container}>
        <View
          style={[
            styles[position].wrapper,
            this.styledBubbleToNext(),
            this.styledBubbleToPrevious(),
            this.styledBubbleEndTime(),
          ]}>
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits="text">
            {this.renderBubbleContent()}
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};
Bubble.defaultProps = {
  onLongPress: null,
  position: 'left',
  optionTitles: DEFAULT_OPTION_TITLES,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
};
Bubble.propTypes = {
  user: PropTypes.object.isRequired,
  onLongPress: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  optionTitles: PropTypes.arrayOf(PropTypes.string),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
};
//# sourceMappingURL=Bubble.js.map
