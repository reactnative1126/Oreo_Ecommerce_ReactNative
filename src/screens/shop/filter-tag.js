import React from 'react';
import { Text, ThemedView } from 'src/components';

class FilterTag extends React.Component {
  render() {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Filter</Text>
      </ThemedView>
    );
  }
}

export default FilterTag;
