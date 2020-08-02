export default class Demo {
  data = {};
  static setData = (_data) => {
    this.data = _data;
  };

  static getData = () => {
    return this.data;
  };
}
