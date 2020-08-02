import moment from 'moment-timezone';

export const timeAgo = (date, tz = 'UTC') => {
  if (!date) {
    return null;
  }
  return moment.tz(date, tz).fromNow();
};

export const getTimeDate = (date, tz = 'UTC') => {
  if (!date) {
    return null;
  }
  return moment.tz(date, tz).format('DD/MM/YYYY [at] hh:mma');
};
