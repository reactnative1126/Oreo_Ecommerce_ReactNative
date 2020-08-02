import React from 'react';

import {List} from 'immutable';
import findIndex from 'lodash/findIndex';
import {connect} from 'react-redux';

import {ListItem} from 'src/components';
import Container from 'src/containers/Container';
import AttributeColor from './containers/AttributeColor';
import AttributeImage from './containers/AttributeImage';
import ViewRefine from './containers/ViewRefine';

import {filterBySelector} from 'src/modules/product/selectors';
import {filterByProduct} from 'src/modules/product/actions';
import {mainStack} from 'src/config/navigator';

class FilterAttribute extends React.Component {
  /**
   * Select term
   * @param term_id
   */
  selectItem = term_id => {
    const {filterBy, filterByProduct, navigation} = this.props;
    const attribute = navigation.getParam('attribute', false);

    const attribute_term = filterBy
      .get('attribute_term')
      .filter(item => findIndex(attribute.get('options').toJS(), {term_id: item}) >= 0);

    if (attribute_term.indexOf(term_id) >= 0) {
      const newFilter = filterBy
        .set('attribute_term', attribute_term.filter(item => item !== term_id))
        .set('attribute', attribute.get('slug'));
      filterByProduct(newFilter);
    } else {
      const newFilter = filterBy
        .set('attribute_term', attribute_term.push(term_id))
        .set('attribute', attribute.get('slug'));
      filterByProduct(newFilter);
    }
  };

  /**
   * Render attributes item
   * @param item
   * @returns {*}
   */
  renderAttributeTerms = (type, item) => {
    const {filterBy} = this.props;
    const attribute_term = filterBy.get('attribute_term');

    const check =
      attribute_term.indexOf(item.term_id) >= 0
        ? {
          name: 'check',
          size: 18,
        }
        : null;

    let leftElement = null;

    if (type === 'color') {
      leftElement = <AttributeColor color={item.value}/>;
    }

    if (type === 'image') {
      leftElement = <AttributeImage image={item.value}/>;
    }

    return (
      <ListItem
        leftElement={leftElement}
        key={item.term_id}
        title={item.name}
        type="underline"
        small
        rightIcon={check}
        onPress={() => this.selectItem(item.term_id)}
      />
    );
  };

  showResult = () => {
    const {filterBy, navigation} = this.props;
    navigation.navigate(mainStack.products, {filterBy});
  };

  clearAll = () => {
    const {filterBy, filterByProduct} = this.props;
    const newFilter = filterBy
      .set('attribute_term', List())
      .set('attribute', '');
    filterByProduct(newFilter);
  };

  render() {
    const {
      navigation,
      screenProps: {t},
    } = this.props;
    const attribute = navigation.getParam('attribute', false);

    return (
      <ViewRefine titleHeader={t('common:text_refine')} handleResult={this.showResult} clearAll={this.clearAll}>
        <Container>
          {attribute
            ? attribute.get('options').map(item => this.renderAttributeTerms(attribute.get('type'), item.toJS()))
            : null}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterAttribute);
