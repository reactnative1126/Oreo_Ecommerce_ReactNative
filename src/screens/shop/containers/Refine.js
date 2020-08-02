import React from 'react';

import {useTranslation} from 'react-i18next';

import {StyleSheet, TouchableOpacity} from 'react-native';

import {Icon, Text} from 'src/components';

import {margin} from 'src/components/config/spacing';

const Refine = ({onPress}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity style={styles.touch} onPress={onPress}>
      <Icon name="sliders" size={16} />
      <Text medium style={styles.text}>
        {t('catalog:text_refine')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    lineHeight: 20,
    marginLeft: margin.small,
  },
});

export default Refine;
