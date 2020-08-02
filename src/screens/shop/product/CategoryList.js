import React from 'react';
import unescape from 'lodash/unescape';
import {StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text, withTheme} from 'src/components';
import {margin, padding, borderRadius} from 'src/components/config/spacing';

const CategoryList = ({onPress, data, theme}) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <View>
      <ScrollView
        horizontal={true}
        // pagingEnabled={true} // animates ScrollView to nearest multiple of it's own width
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {data.map((value, index) => (
          <TouchableOpacity
            key={value.id}
            onPress={() => onPress(value.id, value.name)}
            style={[
              styles.item,
              index === 0 && styles.itemFirst,
              index === data.length - 1 && styles.itemLast,
              {borderColor: theme.CategoryProductList.borderColor},
            ]}
          >
            <Text h6 style={[styles.textName, {color: theme.CategoryProductList.color}]}>
              {unescape(value.name)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 38,
    marginBottom: margin.big,
  },
  item: {
    borderWidth: 1,
    borderRadius: borderRadius.base,
    justifyContent: 'center',
    paddingHorizontal: padding.big,
    marginRight: margin.small,
  },
  itemFirst: {
    marginLeft: margin.large,
  },
  itemLast: {
    marginRight: margin.large,
  },
  textName: {
    lineHeight: 17,
  },
});

CategoryList.defaultProps = {
  onPress: () => {
  },
  data: [],
};

export default withTheme(CategoryList);
