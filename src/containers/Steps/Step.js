import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Divider, Avatar, withTheme } from 'src/components';

import { grey6 } from 'src/components/config/colors';
import { margin } from 'src/components/config/spacing';

class Step extends Component {
  render() {
    const { item, active, visit, theme } = this.props;
    const { colors } = theme;
    return (
      <View style={styles.container}>
        {visit !== 'start' && (
          <Divider
            style={[
              styles.line,
              {
                backgroundColor: active ? colors.primary : colors.border,
              },
            ]}
          />
        )}
        <View style={styles.icon}>
          <Avatar
            rounded
            size={46}
            icon={{
              name: item.icon,
              type: item.iconType,
              size: 20,
              color: active ? colors.bgColor : grey6,
            }}
            overlayContainerStyle={{
              backgroundColor: active ? colors.primary : 'transparent',
              borderWidth: 1,
              borderColor: active ? colors.primary : colors.border,
            }}
            containerStyle={visit === 'middle' && styles.icon}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    marginHorizontal: margin.small,
  },
  icon: {
    marginHorizontal: margin.base - margin.small,
  },
});

Step.defaultProps = {
  visit: 'start',
};

export default withTheme(Step);
