import React, {Component} from 'react';

import {connect} from 'react-redux';
import {compose} from 'recompose';

import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {withTranslation} from 'react-i18next';

import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';
import Item from './Item';

import {mainStack} from 'src/config/navigator';
import {languageSelector} from 'src/modules/common/selectors';
import {getVendors} from 'src/modules/vendor/service';
import {fetchVendorDetailSuccess} from 'src/modules/vendor/actions';

import {padding} from 'src/components/config/spacing';

const initHeader = {
  style: {},
};

class Vendors extends Component {
  constructor(props) {
    super(props);
    const {fields} = props;
    this.state = {
      data: [],
      loading: false,
      limit:
        fields && fields.limit && parseInt(fields.limit)
          ? parseInt(fields.limit)
          : 4,
    };
  }
  componentDidMount() {
    const {fields} = this.props;
    this.setState({
      loading: true,
    });
    const limit =
      fields && fields.limit && parseInt(fields.limit)
        ? parseInt(fields.limit)
        : 4;
    const query = {per_page: limit};
    getVendors(query)
      .then(data => {
        this.setState({
          loading: false,
          data,
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
        console.log(e);
      });
  }
  clickDetailVendor = data => {
    const {dispatch, navigation} = this.props;
    dispatch(fetchVendorDetailSuccess(data));
    navigation.navigate(mainStack.store_detail);
  };
  render() {
    const {navigation, fields, language, t} = this.props;
    const {data, loading} = this.state;
    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;

    const headerDisable = !fields.boxed ? 'all' : 'none';
    const contentDisable = !fields.boxed ? 'all' : 'right';
    const padEnd = fields.boxed ? padding.large : 0;

    return (
      <>
        {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
              title={
                heading.text && heading.text[language]
                  ? heading.text[language]
                  : t('common:text_category')
              }
              style={heading.style && heading.style}
              containerStyle={{paddingTop: 0}}
              subTitle={t('common:text_show_all')}
              onPress={() => navigation.navigate(mainStack.stores)}
            />
          </Container>
        )}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Container disable={contentDisable}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={{marginRight: index === data.length - 1 ? padEnd : 10}}
                  onPress={() => this.clickDetailVendor(item)}>
                  <Item item={item} style={{flex: 1}} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Container>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  language: languageSelector(state),
});

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation(),
)(Vendors);
