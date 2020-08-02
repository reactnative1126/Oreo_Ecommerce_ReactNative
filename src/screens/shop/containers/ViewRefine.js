import React from 'react';

import { withTranslation } from 'react-i18next';

import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView, Header } from 'src/components';
import Button from 'src/containers/Button';
import Container from 'src/containers/Container';
import { IconHeader, TextHeader } from 'src/containers/HeaderComponent';

import { margin } from 'src/components/config/spacing';

const ViewRefine = ({ titleHeader, t, handleResult, clearAll, children }) => {
  const title = titleHeader ? titleHeader : t('common:text_refine');

  return (
    <ThemedView isFullView>
      <Header
        leftComponent={<IconHeader name="x" size={24} />}
        centerComponent={<TextHeader title={title} />}
        rightComponent={<TextHeader title={t('common:text_clear_all')} type="button" onPress={clearAll} />}
      />
      <ScrollView style={styles.scroll}>{children}</ScrollView>
      <Container style={styles.footer}>
        <Button title={t('catalog:text_result')} onPress={handleResult} />
      </Container>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  footer: {
    marginVertical: margin.big,
  },
});

ViewRefine.defaultProps = {
  params: {},
  clearAll: () => {}
};

export default  withTranslation()(ViewRefine);
