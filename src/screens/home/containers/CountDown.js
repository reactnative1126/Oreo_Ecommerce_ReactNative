import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import floor from 'lodash/floor';
import {StyleSheet, View} from 'react-native';
import {Text, Icon} from 'src/components';
import Container from 'src/containers/Container';
import {
  languageSelector,
} from 'src/modules/common/selectors';

import {blue, grey5} from 'src/components/config/colors';
import {sizes} from 'src/components/config/fonts';
import {margin} from 'src/components/config/spacing';

class CountDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    const {fields} = this.props;
    const timeExpire = new Date(fields && fields.expire);

    const formatTime = 'YYYY-MM-DD HH:mm:ss';

    // Current time
    let currentTime = moment()
      .utcOffset('+07:00')
      .format(formatTime);

    // End time bed
    let eventTime = moment(timeExpire)
      .utcOffset('+07:00')
      .format(formatTime);
    const diffTime = moment(eventTime).diff(currentTime, 'milliseconds', true);

    let duration = moment.duration(diffTime);
    const interval = 1000;

    this.countDown = setInterval(() => {
      if (duration > 0) {
        duration = moment.duration(duration - interval);

        this.setState({
          days: floor(duration.asDays()) ? floor(duration.asDays()) : 0,
          hours: duration.hours() ? duration.hours() : 0,
          minutes: duration.minutes() ? duration.minutes() : 0,
          seconds: duration.seconds() ? duration.seconds() : 0,
        });
      }

    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  render() {
    const {fields, language, t} = this.props;
    const {days, hours, minutes, seconds} = this.state;
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    return (
      <Container disable={!fields.boxed ? 'all' : 'none'} style={styles.container}>
        <View style={styles.viewText}>
          {fields.title && fields.title.text &&
          <Text medium style={[styles.title, fields.title.style]}>{fields.title.text[language]}</Text>}
        </View>
        <View style={styles.time}>
          <Icon
            name='clock'
            color={grey5}
            size={15}
            containerStyle={styles.icon}
          />
          <Text medium style={{color: fields.color ? fields.color : blue}}>{days > 0 ? `${days}d : ` : ''}{hours}h
            : {minutes}m : {seconds}s</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    flex: 1,
    marginRight: margin.base,
  },
  title: {
    fontSize: sizes.h3,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: margin.small,
  },
});

const mapStateToProps = state => ({
  language: languageSelector(state),
});

export default connect(mapStateToProps)(CountDown);
