import {showMessage} from 'react-native-flash-message';

export function handleError(e) {
  showMessage({
    // message: e.code,
    message: e.message,
    // description: e.message,
    type: 'danger',
  });
}

export function notificationMessage(data) {
  const type = data && data.type ? data.type : 'error';
  const message = data && data.message ? data.message : 'Fail';
  const errors = data && data.errors ? data.errors : {};
  return {
    type,
    message,
    errors,
  };
}
