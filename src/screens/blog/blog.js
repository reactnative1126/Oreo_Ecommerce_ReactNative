import React from 'react';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import merge from 'lodash/merge';
import unescape from 'lodash/unescape';

import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import {Header, Icon, Text, ThemedView} from 'src/components';
import Container from 'src/containers/Container';
import TextHtml from 'src/containers/TextHtml';
import Empty from 'src/containers/Empty';
import InfoViewer from './containers/InfoViewer';
import {IconHeader, TextHeader} from 'src/containers/HeaderComponent';

import {defaultPropsData, getSingleData} from 'src/hoc/single-data';
import {withLoading} from 'src/hoc/loading';

import {timeAgo} from 'src/utils/time';
import {padding, margin, borderRadius} from 'src/components/config/spacing';
import {changeLineHeight, changeColor} from 'src/utils/text-html';

import {blogStack} from 'src/config/navigator';
import {languageSelector} from 'src/modules/common/selectors';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width - 2 * padding.large;
const MIN_HEIGHT_IMAGE = (WIDTH_IMAGE * 304) / 344;

const marginSmall = margin.small;
const marginLarge = margin.large;
const marginBig = margin.base + margin.large;

class BlogDetail extends React.Component {
  constructor(props) {
    super(props);
    const {navigation, data} = props;
    const blog = navigation.getParam('blog', {});
    this.state = {
      blog: blog && blog.id ? blog : data,
    };
  }
  share = () => {
    const {blog} = this.state;
    let message =
      Platform.OS === 'android'
        ? `${blog.title.rendered}. ${blog.link}`
        : blog.title.rendered;

    Share.share(
      {
        message: message,
        url: blog.link,
        title: 'Share',
      },
      {
        // // Android only:
        dialogTitle: 'Oreo post',
        // // iOS only:
        // excludedActivityTypes: [
        //   'com.apple.UIKit.activity.PostToTwitter'
        // ]
      },
    );
  };

  renderData = () => {
    const {
      screenProps: {t, theme},
    } = this.props;
    const {blog} = this.state;

    if (!blog || !blog.id) {
      return (
        <Empty
          title={'Get data fail'}
          subTitle={'Check id blog'}
          titleButton="Go Blogs"
          clickButton={() => navigation.navigate(blogStack.blog_list)}
        />
      );
    }

    return (
      <ScrollView>
        <Container>
          <Image
            source={
              blog.rnlab_featured_media_url
                ? {uri: blog.rnlab_featured_media_url}
                : require('src/assets/images/pDefault.png')
            }
            resizeMode="contain"
            style={styles.image}
          />
          <Text h6 colorThird style={styles.textTime}>
            {timeAgo(blog.date)}
          </Text>
          <Text h2 medium style={styles.textTitle}>
            {unescape(blog.title.rendered)}
          </Text>
          {/*<TextHtml value={text} style={styleHtml(theme)} />*/}
          <InfoViewer categories={blog._categories} user={blog.author_url} />
          <View style={styles.viewDesciption}>
            <TextHtml value={blog.content.rendered} style={merge(changeColor(theme.Text.secondary.color), changeLineHeight(28))} />
          </View>
          <View style={styles.viewShare}>
            <TouchableOpacity style={styles.buttonShare} onPress={this.share}>
              <Icon name="share" size={20} />
              <Text colorSecondary style={styles.textShare}>
                {t('blog:text_share')}
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    );
  };
  render() {
    const {
      screenProps: {t},
    } = this.props;

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_blog')} />}
        />
        {this.renderData()}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH_IMAGE,
    minHeight: MIN_HEIGHT_IMAGE,
    borderRadius: borderRadius.large,
    marginBottom: marginLarge,
  },
  textTime: {
    marginBottom: marginSmall,
  },
  textTitle: {
    marginBottom: marginSmall,
  },
  viewDesciption: {
    marginVertical: margin.big + margin.base,
  },
  viewShare: {
    alignItems: 'flex-end',
    marginBottom: marginBig,
  },
  buttonShare: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textShare: {
    marginLeft: margin.small,
  },
});

const mapStateToProps = state => {
  return {
    lang: languageSelector(state),

  };
};

const withReduce = connect(mapStateToProps);

export default compose(
  withReduce,
  defaultPropsData,
  getSingleData,
  withLoading,
)(BlogDetail);
