import React from 'react';
import {Dimensions} from 'react-native';
import SlideshowBasic from './Basic';
import SlideshowCreative from './Creative';

import action from 'src/utils/action';

const {width} = Dimensions.get('window');

class Slideshow extends React.Component {

  render() {
    const { layout, fields, widthComponent } = this.props;

    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    if (layout === 'creative') {
      return <SlideshowCreative fields={fields} widthComponent={widthComponent} clickGoPage={data => action(data)} />;
    }

    return <SlideshowBasic fields={fields} widthComponent={widthComponent} clickGoPage={data => action(data)} />;
  }
}

Slideshow.defaultProps = {
  widthComponent: width,
};
export default Slideshow;
