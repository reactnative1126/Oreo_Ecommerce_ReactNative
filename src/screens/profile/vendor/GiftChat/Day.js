import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {StyleSheet} from 'react-native';
import {Text} from 'src/components';

import {isSameDay} from 'react-native-gifted-chat/lib/utils';
import {margin} from 'src/components/config/spacing';

class Day extends React.PureComponent {
  render() {
    const {dateFormat, currentMessage, previousMessage} = this.props;
    if (currentMessage && !isSameDay(currentMessage, previousMessage)) {
      return (
        <Text colorThird h6 medium h6Style={styles.text}>
          {moment(currentMessage.createdAt)
            .locale(this.context.getLocale())
            .format(dateFormat)}
        </Text>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: margin.small - 3,
    marginBottom: margin.base,
  },
});

Day.contextTypes = {
  getLocale: PropTypes.func,
};
Day.defaultProps = {
  currentMessage: {
    createdAt: null,
  },
  previousMessage: {},
  nextMessage: {},
  textStyle: {},
  dateFormat: 'll',
};
Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  textStyle: PropTypes.any,
  dateFormat: PropTypes.string,
};

export default Day;
