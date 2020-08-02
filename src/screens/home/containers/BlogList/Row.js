import React from 'react';

import {ScrollView, View} from 'react-native';
import ItemBlogRow from 'src/screens/blog/containers/ItemBlogRow';

import {padding} from 'src/components/config/spacing';

const BlogRow = ({data, width, height, boxed, tz}) => {
  return (<View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data.map((blog, index) => (
        <ItemBlogRow
          tz={tz}
          key={index}
          item={blog}
          width={width}
          height={height}
          style={{marginRight: index !== data.length -1 ? padding.small: boxed ? padding.large: 0}}
        />
      ))}
    </ScrollView>
  </View>)
};
BlogRow.defaultProps = {
  data: [],
  width: 223,
  height: 183,
  boxed: false
};

export default BlogRow;
