import React from 'react';

import { connect } from 'react-redux';
import unescape from 'lodash/unescape';

import { ListItem } from 'src/components';
import Container from 'src/containers/Container';
import ViewRefine from './containers/ViewRefine';

import { filterBySelector } from 'src/modules/product/selectors';
import { filterByProduct } from 'src/modules/product/actions';

import { languageSelector } from 'src/modules/common/selectors';

import { mainStack } from 'src/config/navigator';

class FilterCategory extends React.Component {

  /**
   * Select category
   * @param category_id
   */
  selectItem = category_id => {
    const { filterBy, filterByProduct } = this.props;
    const newFilter = filterBy.set('category', category_id);
    filterByProduct(newFilter)
  };

  /**
   * Render category item
   * @param item
   * @returns {*}
   */
  renderCategory = item => {
    const { filterBy } = this.props;
    const chevron =
      item.id === filterBy.get('category')
        ? {
            name: 'check',
            size: 18,
          }
        : true;
    return (
      <ListItem
        key={item.id}
        title={unescape(item.name)}
        type="underline"
        small
        chevron={chevron}
        onPress={() => this.selectItem(item.id)}
      />
    );
  };

  showResult = () => {
    const { filterBy, navigation } = this.props;
    navigation.navigate(mainStack.products, { filterBy });
  };

  clearAll = () => {
    const {filterBy, filterByProduct} = this.props;
    filterByProduct(filterBy.set('category', ""));
  };

  render() {
    const {
      navigation,
      filterBy,
      screenProps: {t},
    } = this.props;

    // Get Category
    const category = navigation.getParam('category', {});
    const categories = category && category.categories ? category.categories  : [];

    const checked = filterBy.get('category') && filterBy.get('category') !== category.id;
    const chevron = checked ? true : { name: 'check', size: 18, isRotateRTL: false };

    return (
      <ViewRefine titleHeader={t('catalog:text_category')} handleResult={this.showResult} clearAll={this.clearAll}>
        <Container>
          <ListItem
            key={category.id}
            title={t('catalog:text_all_category')}
            type="underline"
            small
            chevron={chevron}
            onPress={() => this.selectItem(category.id)}
          />
          {categories.length > 0 && categories.map(item => this.renderCategory(item))}
        </Container>
      </ViewRefine>
    );
  }
}

const mapDispatchToProps = {
  filterByProduct,
};

const mapStateToProps = state => {
  return {
    filterBy: filterBySelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);
