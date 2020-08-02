import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'src/components';
import { grey2 } from 'src/components/config/colors';

const RadioIcon = ({ isSelect, theme }) => {
  return (
    <View style={styles.container}>
      {isSelect && (
        <View
          style={[
            styles.round,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: grey2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default withTheme(RadioIcon);
