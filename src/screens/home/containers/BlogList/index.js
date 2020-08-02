import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {withTranslation} from 'react-i18next';
import isEqual from 'lodash/isEqual';
import split from 'lodash/split';
import take from 'lodash/take';

import {ActivityIndicator} from 'react-native';
import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';

import BlogColumn from './Gird';
import BlogRow from './Row';

import {getBlogs} from 'src/modules/blog/service';
import {getSiteConfig, languageSelector} from 'src/modules/common/selectors';

import {prepareBlogItem} from 'src/utils/blog';
import {homeDrawer} from 'src/config/navigator';
import {typeBlog, typeShowblog} from './config'

const initHeader = {
  style: {},
};

const valueLimit = fields => {
  if (!fields) {
    return 4;
  }
  const count = fields.limit && parseInt(fields.limit) ? parseInt(fields.limit) : 4;
  return !count || !count < 0 ? 4 : count;
};

const valueType = fields => {
  if (!fields) {
    return typeBlog.latest;
  }
  const valueType = fields.blog_type && fields.blog_type.type
    ? fields.blog_type.type
    : typeBlog.latest;

  const existObject = Object.values(typeBlog).indexOf(valueType) > -1;

  return existObject ? valueType : typeBlog.latest;
};

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      per_page: valueLimit(props.fields),
      type: valueType(props.fields),
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.fields &&
      this.props.fields &&
      (!isEqual(prevProps.fields.limit, this.props.fields.limit) ||
        !isEqual(prevProps.fields.blog_type, this.props.fields.blog_type))
    ) {
      this.setState(
        {
          per_page: valueLimit(this.props.fields),
          type: valueType(this.props.fields),
        },
        this.fetchData
      );
    }
  }

  fetchData = () => {
    const { type, per_page } = this.state;
    this.setState({
      loading: true,
    });
    if (type === typeBlog.custom) {
      this.getCustom(per_page);
    } else {
      this.getLatest(per_page);
    }
  };

  /**
   * Get product latest
   * @param per_page
   * @returns {Promise<void>}
   */
  getLatest = async per_page => {
    try {
      const query = {
        per_page,
      };
      const data = await getBlogs(query);
      const prepareData = data.map(v => prepareBlogItem(v));
      this.setState({
        data: prepareData,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      // handleError(error);
    }
  };

  /**
   * Get blog custom
   * @param per_page
   * @returns {Promise<void>}
   */
  getCustom = async per_page => {
    try {
      const { fields } = this.props;
      const ids = fields && fields.blog_type && fields.blog_type.ids
        ? fields.blog_type.ids
        : '';
      const arrayId = split(ids, ',');
      const query = {
        include: take(arrayId, per_page),
        per_page: per_page,
      };
      // Get list product
      const data = await getBlogs(query);
      const prepareData = data.map(v => prepareBlogItem(v));
      this.setState({
        data: prepareData,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      // handleError(error);
    }
  };

  render() {
    const {navigation, fields, layout, language, t, siteConfig} = this.props;
    const {data, loading} = this.state;
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }
    let widthImage = fields.width && parseInt(fields.width)? parseInt(fields.width) : 137;
    let heightImage = fields.height && parseInt(fields.height) ? parseInt(fields.height) : 123;

    const heading = fields.text_heading ? fields.text_heading : initHeader;
    const headerDisable = !fields.boxed ? 'all' : 'none';
    const categoryDisable = fields.boxed ? typeShowblog[layout] === 'column' ? 'none': 'right' : 'all';

    return (
      <>
        {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
              title={heading.text && heading.text[language] ? heading.text[language]: t('common:text_category')}
              style={heading.style}
              containerStyle={{ paddingTop: 0 }}
              subTitle={t('common:text_show_all')}
              onPress={() => navigation.navigate(homeDrawer.blog)}
            />
          </Container>
        )}
        <Container disable={categoryDisable}>
          {loading?
            <ActivityIndicator />:
            typeShowblog[layout] === 'row' ?
              <BlogRow
                tz={siteConfig.get('timezone_string')}
                data={data}
                boxed={fields.boxed}
                width={widthImage}
                height={heightImage}
              /> :
              <BlogColumn
                data={data}
                boxed={fields.boxed}
                width={widthImage}
                height={heightImage}
              />
          }
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  language: languageSelector(state),
  siteConfig: getSiteConfig(state),
});

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation()
)(BlogList);
