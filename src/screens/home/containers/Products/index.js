import React from 'react';

import {Dimensions} from 'react-native';
import Container from 'src/containers/Container';
import Grid from './Grid';
import Carousel from './Carousel';
import List from './List';

import {productListLayout, colProductLayout} from 'src/config/product';
import {padding} from 'src/components/config/spacing';

const {width} = Dimensions.get('window');

class Products extends React.Component {
  render() {
    const {data, layout, fields, widthComponent, navigationType} = this.props;
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    let widthImage = fields.width && parseInt(fields.width)? parseInt(fields.width) : 204;
    let heightImage = fields.height && parseInt(fields.height)? parseInt(fields.height) : 257;

    const typeShow = productListLayout[layout] ? productListLayout[layout] : productListLayout.onecolumn;
    const col = colProductLayout[layout] ? colProductLayout[layout] : colProductLayout.onecolumn;
    const widthView = !fields.boxed ? widthComponent : typeShow === 'carousel' ? widthComponent - padding.large : widthComponent - 2*padding.large;
    const disableContainer = !fields.boxed ? 'all': typeShow === 'carousel' ? 'right' : 'none';
    const Component = typeShow === 'list' ? List : typeShow === 'carousel' ? Carousel : Grid;

    return (
     <Container disable={disableContainer}>
       <Component
         data={data}
         width={widthImage}
         height={heightImage}
         widthView={widthView}
         col={col}
         box={fields.boxed}
         navigationType={navigationType}
       />
     </Container>
    )
  }
}

Products.defaultProps = {
  data: [],
  layout: 'onecolumn',
  widthComponent: width,
};

export default Products;
