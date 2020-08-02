import moment from 'moment';

export function isSameTime(currentMessage, diffMessage) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.isSame(diffCreatedAt, 'minute');
}
