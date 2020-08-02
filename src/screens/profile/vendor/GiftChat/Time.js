import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'src/components';
import moment from 'moment';

const styles = {
  left: StyleSheet.create({
    text: {
      textAlign: 'left',
      textTransform: 'lowercase',
    },
  }),
  right: StyleSheet.create({
    text: {
      textAlign: 'right',
      textTransform: 'lowercase',
    },
  }),
};
export default class Time extends Component {
  render() {
    const {position, currentMessage, timeFormat} = this.props;
    if (!!currentMessage) {
      return (
        <Text colorThird h6 h6Style={styles[position].text}>
          {moment(currentMessage.createdAt)
            .locale(this.context.getLocale())
            .format(timeFormat)}
        </Text>
      );
    }
    return null;
  }
}
Time.contextTypes = {
  getLocale: PropTypes.func,
};
Time.defaultProps = {
  position: 'left',
  currentMessage: {
    createdAt: null,
  },
  timeFormat: 'lt',
};
Time.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  timeFormat: PropTypes.string,
};
//# sourceMappingURL=Time.js.map
