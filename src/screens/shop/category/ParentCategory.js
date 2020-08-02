import React from 'react';
import unescape from 'lodash/unescape';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text, ThemedView, withTheme} from 'src/components';
import {margin} from 'src/components/config/spacing';

const ParentCategory = ({data, selectVisit, onChange, theme, width}) => {
  return (
    <ThemedView style={{width}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              {
                borderBottomColor: theme.colors.bgColorSecondary,
              },
              selectVisit && item.id === selectVisit.id && {
                backgroundColor: theme.colors.bgColorSecondary,
                borderLeftColor: theme.colors.primary,
              },
            ]}
            onPress={() => onChange(item)}
          >
            <Text
              style={styles.name}
              medium={selectVisit && item.id === selectVisit.id}
            >{unescape(item.name)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent'
  },
  name: {
    marginVertical: margin.large + 4,
    marginHorizontal: margin.small,
  }
});

ParentCategory.defaultProps = {
  data: [],
  onChange: () => {},
  width: 124,
};

export default withTheme(ParentCategory);
