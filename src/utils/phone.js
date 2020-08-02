import auth from '@react-native-firebase/auth';

export function sendOtp(phone) {
  return new Promise((resolve, reject) => {
    auth()
      .verifyPhoneNumber(phone)
      .then(confirmation => {
        resolve(confirmation);
      })
      .catch(e => reject(e));
  });
}
