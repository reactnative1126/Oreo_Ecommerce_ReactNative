import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Step from './Step';
import Container from '../Container';

const visitStep = (value = 0, length = 1) => {
  if (value === 0) {
    return 'start';
  }
  if (value + 1 === length) {
    return 'end';
  }
  return 'middle';
};

class Steps extends Component {
  render() {
    const { data, current, style } = this.props;
    return (
      <Container style={[styles.container, style && style]}>
        {data.map((d, i) => (
          <View style={i !== 0 && styles.content} key={i}>
            <Step item={d} active={i <= current} visit={visitStep(i, data.length)} />
          </View>
        ))}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
  },
});

export default Steps;
