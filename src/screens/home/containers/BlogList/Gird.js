import React from 'react';

import ItemBlog from 'src/screens/blog/containers/ItemBlog';

import {padding} from 'src/components/config/spacing';

const BlogColumn = ({data, width, height}) => {
  const widthImage = 137;
  const heightImage = (widthImage * height)/width;
  return data.map((blog, index) => (
    <ItemBlog
      key={index}
      item={blog}
      width={widthImage}
      height={heightImage}
      style={index > 0 && { paddingTop: padding.big}}
    />
  ))
};

BlogColumn.defaultProps = {
  data: [],
  width: 137,
  height: 123,
};

export default BlogColumn;
