// @flow

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { withTheme } from 'react-native-elements';
import Text from '../Text';

import { padding, margin, borderRadius } from 'src/styles/spacing';

type Props = {
  visit: number,
  activeVisit: number,
  title: string,
  start: boolean,
  middle: boolean,
  end: boolean,
  goToPage: (visit: number) => {},
};
const ItemTab = (props: Props) => {
  const { theme, visit, activeVisit, title, start, middle, end, goToPage } = props;

  return (
    <TouchableOpacity
      style={[
        styles.touch,
        {
          borderColor: theme.colors.borderColor,
        },
        start && styles.start,
        middle && styles.middle,
        end && styles.end,
        visit === activeVisit && {
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.primary,
        },
      ]}
      onPress={() => goToPage(visit)}
    >
      <Text medium color={visit === activeVisit && 'bgColor'}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    height: 40,
    minWidth: 115,
    paddingHorizontal: padding.big,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  start: {
    borderTopLeftRadius: borderRadius.base,
    borderBottomLeftRadius: borderRadius.base,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  middle: {
    borderRightWidth: 1,
  },
  end: {
    borderTopRightRadius: borderRadius.base,
    borderBottomRightRadius: borderRadius.base,
    borderRightWidth: 1,
  },
});

ItemTab.defaultProps = {
  visit: 0,
  activeVisit: 0,
  start: true,
  middle: true,
  end: true,
  goToPage: (visit: 1) => {},
};
export default withTheme(ItemTab);
