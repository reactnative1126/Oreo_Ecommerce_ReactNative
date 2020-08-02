// @flow
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { withTheme } from 'src/components';

export default withTheme(({ theme, ...rest }) => (
  <View style={styles.container}>
    <ActivityIndicator {...rest} color={theme.colors.primary} />
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
});
