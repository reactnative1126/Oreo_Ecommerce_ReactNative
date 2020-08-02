import React from 'react';
import { connect } from 'react-redux';
import unescape from 'lodash/unescape';
import { StyleSheet } from 'react-native';
import { ListItem, withTheme } from 'src/components';
import Container from 'src/containers/Container';

import { filterBySelector } from 'src/modules/product/selectors';

import { grey3 } from 'src/components/config/colors';

const SearchProductItem = props => {
  const { data, search, handleProductPage, theme } = props;

  if (!search || search.length < 1) {
    return null;
  }

  return (
    <Container
      style={[
        styles.viewSearch,
        {
          borderColor: theme.colors.border,
        },
      ]}
    >
      {data.map(dataSearch => (
        <ListItem
          key={dataSearch.id}
          title={unescape(dataSearch.name)}
          type="underline"
          small
          leftIcon={{
            name: 'search',
            size: 16,
            color: grey3,
          }}
          onPress={() => handleProductPage(dataSearch)}
        />
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  viewSearch: {
    borderTopWidth: 1,
  },
});

SearchProductItem.defaultProps = {
  data: [],
  handleProductPage: () => {},
};

const mapStateToProps = state => {
  return {
    search: filterBySelector(state).get('search'),
  };
};

export default connect(mapStateToProps)(withTheme(SearchProductItem));
