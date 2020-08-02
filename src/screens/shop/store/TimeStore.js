import React from 'react';
import split from 'lodash/split';
import includes from 'lodash/includes';

import {StyleSheet, ScrollView, View} from 'react-native';
import {Text, Icon} from 'src/components';
import Container from 'src/containers/Container';
import {margin, padding} from 'src/components/config/spacing';

const iconStatus = {
  open: {
    name: 'check',
    color: 'success',
    text: 'open_notice',
  },
  close: {
    name: 'x',
    color: 'error',
    text: 'close_notice',
  },
};

const weeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const convertHourToDate = hour => {
  const currentDate = new Date();
  let h = 0;
  let m = 0;
  if (hour && typeof hour === 'string') {
    const arrHour = split(hour,":");
    const addHour = includes(hour,'pm') ? 12 : 0;
    h = arrHour[0] && parseInt(arrHour[0]) ? parseInt(arrHour[0]) + addHour : h;
    m = arrHour[1] && parseInt(arrHour[1]) ? parseInt(arrHour[1]) : m;
  }
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    h,
    m,
  );
};

class TimeStore extends React.Component {
  status = () => {
    const {store} = this.props;
    const {
      store_open_close: {time},
    } = store;
    if (
      !typeof time === 'object' ||
      (typeof time === 'object' && Array.isArray(time))
    ) {
      return 'close';
    }
    const currentDate = new Date();
    const keyTime = weeks[currentDate.getDay()];
    const getTime = time[keyTime];
    if (getTime && getTime.status === 'open') {
      const timeOpen = getTime.opening_time;
      const timeClose = getTime.closing_time || '24:00';
      const dateOpen = convertHourToDate(timeOpen);
      const dateClose = convertHourToDate(timeClose);
      if (
        currentDate.getTime() >= dateOpen.getTime() &&
        currentDate.getTime() <= dateClose.getTime()
      ) {
        return 'open';
      }
      return 'close';
    }

    return 'close';
  };
  renderTime = time => {
    if (
      !typeof time === 'object' ||
      (typeof time === 'object' && Array.isArray(time))
    ) {
      return null;
    }
    return weeks.map(week => {
      const value = time[week];
      if (!value) {
        return null;
      }
      const strTime =
        value.status === 'close'
          ? "Off Day"
          : `${value.opening_time ? `${value.opening_time} ` : ''}-${value.closing_time? ` ${value.closing_time}`: ''}`;
      return (
        <View key={week} style={styles.viewTime}>
          <Text style={styles.nameWeek}>{week}</Text>
          <Text colorSecondary>: {strTime}</Text>
        </View>
      );
    });
  };
  render() {
    const {
      store,
      screenProps: {theme},
    } = this.props;
    const {
      store_open_close: {time, open_notice, close_notice},
    } = store;
    const timeIcon = iconStatus[this.status()] || iconStatus.close;
    return (
      <ScrollView>
        <Container style={styles.container}>
          <View style={[styles.header, {borderColor: theme.colors.border}]}>
            <Icon
              name={timeIcon.name}
              color={theme.colors[timeIcon.color]}
              size={20}
              containerStyle={styles.icon}
            />
            <Text style={{color: theme.colors[timeIcon.color]}} h4 medium>
              {timeIcon.text === 'open_notice' ? open_notice : close_notice}
            </Text>
          </View>
          {this.renderTime(time)}
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: margin.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: padding.large + 3,
    borderBottomWidth: 1,
    marginBottom: margin.large,
  },
  icon: {
    marginRight: margin.small,
  },
  viewTime: {
    flexDirection: 'row',
    marginBottom: margin.large,
  },
  nameWeek: {
    width: 132,
    textTransform: 'capitalize',
  },
});

export default TimeStore;
