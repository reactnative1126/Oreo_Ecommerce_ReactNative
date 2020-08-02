export default class Global {
  token = '';
  static setToken = (token) => {
    this.token = token;
  };

  static getToken = () => {
    return this.token;
  };
}
