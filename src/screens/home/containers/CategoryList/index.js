import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import { withTranslation } from 'react-i18next';
import { categorySelector } from 'src/modules/category/selectors';

import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';

import Gird from './Gird';
import Row from './Row';

import { homeTabs } from 'src/config/navigator';
import { languageSelector } from 'src/modules/common/selectors';
import { margin, padding } from 'src/components/config/spacing';
import {typeShowCategory } from 'src/config/category';

const initHeader = {
  style: {},
};

const { width } = Dimensions.get('window');

class CategoryList extends Component {
  render() {
    const { category, navigation, fields, layout, widthComponent, language, t } = this.props;

    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;

    let widthImage = fields.width && parseInt(fields.width)? parseInt(fields.width) : 109;
    let heightImage = fields.height && parseInt(fields.height)? parseInt(fields.height) : 109;

    const dataParent = category.data.filter(item => item.parent === 0);

    const limit = fields.limit && parseInt(fields.limit) ? parseInt(fields.limit) : dataParent.length;

    const dataShow = dataParent.filter((_, index) => index < limit);

    const widthView = fields.boxed ? widthComponent - 2*padding.large: widthComponent;

    const headerDisable = !fields.boxed ? 'all' : 'none';
    const categoryDisable = fields.boxed ? typeShowCategory[layout] === 'grid' ? 'none': 'right' : 'all';

    const Component = typeShowCategory[layout] === 'grid' ? Gird : Row;

    return (
      <>
        {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
              title={heading.text && heading.text[language] ? heading.text[language ]: t('common:text_category')}
              style={heading.style && heading.style}
              containerStyle={{ paddingTop: 0 }}
              subTitle={t('common:text_show_all')}
              onPress={() => navigation.navigate(homeTabs.shop)}
            />
          </Container>
        )}
        <Container disable={categoryDisable}>
          <Component
            data={dataShow}
            width={widthImage}
            height={heightImage}
            widthView={widthView}
            box={fields.boxed}
            round={fields.round_image}
            border={fields.border}
            disableName={fields.disable_text}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  category: categorySelector(state),
  language: languageSelector(state),
});

CategoryList.defaultProps = {
  widthComponent: width,
};

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation()
)(CategoryList);
