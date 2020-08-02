import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation  } from 'react-i18next';
import { StyleSheet, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Text, Image, withTheme } from 'src/components';
import Container from 'src/containers/Container';
import Pagination from 'src/containers/Pagination';

import { languageSelector } from 'src/modules/common/selectors';

import { white, black } from 'src/components/config/colors';
import { margin, padding, borderRadius } from 'src/components/config/spacing';

const { width } = Dimensions.get('window');

class SlideshowCreative extends React.Component {
  state = {
    pagination: 0,
  };

  render() {
    const { language, fields, clickGoPage, widthComponent, t } = this.props;

    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }

    const widthImage = fields.width && parseInt(fields.width)?
      parseInt(fields.width)
      : 375;
    const heightImage = fields.height && parseInt(fields.height)
      ? parseInt(fields.height)
      : 390;
    const images = fields.images ? fields.images : [];

    const sliderWidth = !fields.boxed ? widthComponent : widthComponent - 2*padding.large;
    const itemWidth = sliderWidth - 60;
    const scale = (itemWidth - 30) / itemWidth;

    const heightView = (itemWidth * heightImage) / widthImage;

    const autoplayDelay = fields.auto_play_delay && parseInt(fields.auto_play_delay)
      ? parseInt(fields.auto_play_delay)
      : 1000;
    const autoplayInterval = fields.auto_play_interval && parseInt(fields.auto_play_interval)
      ? parseInt(fields.auto_play_interval)
      : 1800;

    const styleImage = {
      width: itemWidth,
      height: heightView,
    };

    const { pagination } = this.state;
    return (
      <Container disable={!fields.boxed ? 'all': 'none'}>
        <Carousel
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => clickGoPage(item.action)}>
              <Image
                ImageComponent={ImageBackground}
                source={
                  item.image && item.image[language]
                    ? { uri: item.image[language] }
                    : require('src/assets/images/pDefault.png')
                }
                style={[styles.viewImage, styleImage]}
                imageStyle={styles.image}
              >
                <View style={styles.content}>
                  {item.subTitle && <Text style={[styles.title, item.subTitle.style]} light>
                    {item.subTitle.text && `${item.subTitle.text[language]} `}
                  </Text>}
                  {item.title && <Text style={[styles.title, item.title.style]} medium>
                    {item.title.text && item.title.text[language]}
                  </Text>}
                  {item.enable_button && (
                    <View style={styles.button}>
                      <Text medium style={[styles.titleButton, item.btn_name && item.btn_name.style]}>
                        {item.btn_name && item.btn_name.text && item.btn_name.text[language]
                          ? item.btn_name.text[language]
                          : t('common:text_shopping_now')}
                      </Text>
                    </View>
                  )}
                </View>
              </Image>
            </TouchableOpacity>
          )}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={scale}
          loop
          autoplay={fields.auto_play}
          autoplayDelay={autoplayDelay}
          autoplayInterval={autoplayInterval}
          onSnapToItem={index => this.setState({ pagination: index })}
        />
        {fields.indicator && <Pagination activeVisit={pagination} count={images.length} containerStyle={styles.viewPagination} />}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  viewImage: {
    borderRadius: borderRadius.base,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  content: {
    margin: margin.big,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
  },
  button: {
    minWidth: 70,
    marginTop: margin.big,
    paddingHorizontal: padding.big + 8,
    paddingVertical: padding.large - 3,
    backgroundColor: white,
    borderRadius: borderRadius.base
  },
  titleButton: {
    color: black
  },
  viewPagination: {
    marginTop: margin.big,
    justifyContent: 'center',
  },
});

SlideshowCreative.defaultProps = {
  widthComponent: width,
};

const mapStateToProps = state => ({
  language: languageSelector(state),
});

export default compose(
  withTheme,
  withTranslation(),
  connect(mapStateToProps, null)
)(SlideshowCreative);
