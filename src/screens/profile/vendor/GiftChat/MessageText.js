import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'src/components';

import {grey6, white} from 'src/components/config/colors';

const styles = {
  left: {
    color: grey6,
    marginHorizontal: 4,
    marginVertical: 3,
  },
  right: {
    color: white,
    marginHorizontal: 4,
    marginVertical: 3,
  },
};

class MessageText extends React.PureComponent {
  render() {
    const {currentMessage, position} = this.props;
    if (currentMessage && currentMessage.text) {
      return (
        <Text medium h5 style={styles[position]}>
          {currentMessage.text}
        </Text>
      );
    }
    return null;
  }
}

MessageText.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {},
};

export default MessageText;
