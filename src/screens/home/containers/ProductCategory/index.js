import React from 'react';
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import isEqual from 'lodash/isEqual';

import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';
import Products from '../Products';

import {
  currencySelector,
  daysBeforeNewProductSelector,
  defaultCurrencySelector,
  languageSelector,
} from 'src/modules/common/selectors';

import {getProducts} from 'src/modules/product/service';

import {prepareProductItem} from 'src/utils/product';
import {handleError} from 'src/utils/error';

import {mainStack} from 'src/config/navigator';

const initHeader = {
  style: {},
};

class ProductCategory extends React.Component {
  constructor(props) {
    super(props);
    const category_id = props.fields && props.fields.category_id ? props.fields.category_id : '';
    const per_page = props.fields && props.fields.limit ? props.fields.limit : 4;

    this.state = {
      data: [],
      loading: false,
      category_id,
      per_page,
    };
  }

  componentDidMount() {
    // this.fetchData();
    if (this.props.fields) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.fields, this.props.fields)) {
      const category_id = this.props.fields && this.props.fields.category_id ? this.props.fields.category_id : '';
      const per_page = this.props.fields && this.props.fields.limit ? this.props.fields.limit : 4;

      this.setState(
        {
          per_page,
          category_id,
        },
        () => this.fetchData(category_id, per_page),
      );
    }
  }

  fetchData = (category_id = this.state.category_id, per_page = this.state.per_page) => {

    const { language } = this.props;

    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const query = {
            lang: language,
            status: 'publish',
            category: category_id,
            per_page,
          };
          const data = await getProducts(query);
          this.setState({
            data,
            loading: false,
          });
        } catch (error) {
          this.setState({
            loading: false,
          });
          handleError(error);
        }
      },
    );
  };
  /**
   * Prepare product item to render on FlatList
   * @param item
   * @returns {*}
   */
  prepareProduct = item => {
    const { currency, defaultCurrency, days  } = this.props;
    const mapItem = Map(item);
    const result = prepareProductItem(mapItem, currency, defaultCurrency, days);
    return result.toJS();
  };
  render() {
    const {navigation, navigationType, headingElement, layout, fields, widthComponent, language, t} = this.props;
    const {data, category_id} = this.state;

    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }

    const heading = fields.text_heading ? fields.text_heading : initHeader;

    const listData = data.map(this.prepareProduct);

    const headerDisable = !fields.boxed ? 'all' : 'none';

    return (
      <>
        {headingElement ||
        (fields.disable_heading && (
          <Container disable={headerDisable}>
            {headingElement ? (
              headingElement
            ) : (
              <Heading
                title={heading.text && heading.text[language] ? heading.text[language] : t('common:text_product')}
                style={heading.style}
                containerStyle={{paddingTop: 0}}
                onPress={() =>
                  navigation.navigate(mainStack.products, {
                    name: heading.text[language],
                    id: category_id,
                  })
                }
                subTitle={t('common:text_show_all')}
              />
            )}
          </Container>
        ))}
        <Products
          data={listData}
          layout={layout}
          fields={fields}
          widthComponent={widthComponent}
          navigationType={navigationType}
        />
      </>
    );
  }
}

ProductCategory.defaultProps = {
  headingElement: null,
  // layout: productListLayout.slide,
};

const mapStateToProps = state => ({
  currency: currencySelector(state),
  defaultCurrency: defaultCurrencySelector(state),
  language: languageSelector(state),
  days: daysBeforeNewProductSelector(state),
});

export default compose(
  withTranslation(),
  withNavigation,
  connect(mapStateToProps),
)(ProductCategory);
