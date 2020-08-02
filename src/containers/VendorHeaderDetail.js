import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, TouchableOpacity, Dimensions, Share} from 'react-native';
import {Avatar, Image, Text, Icon} from 'src/components';
import Container from './Container';
import Rating from './Rating';

import {green, white, black} from 'src/components/config/colors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';

const {width: WIDTH} = Dimensions.get('window');

const widthBg = WIDTH - 2 * padding.large;
const heightBg = (widthBg * 120) / 345;

const VendorHeaderDetail = ({store, width, height, style, onPress}) => {
  const {t} = useTranslation();
  if (!store) {
    return null;
  }
  const Component = onPress ? TouchableOpacity : View;
  const componentProps = onPress
    ? {
        onPress,
      }
    : {};
  const count = store.rating && store.rating.count ? store.rating.count : 0;
  const rating = store.rating && store.rating.rating ? store.rating.rating : '0.0';

  const ratingNumber = parseFloat(rating) ? parseFloat(rating) : 0;

  const handleShare = () => {
    Share.share({
      message: 'Share store',
      title: `Store "${store.store_name}".${store.shop_url}`,
      url: store.shop_url,
    });
  };
  return (
    <Component style={style} {...componentProps}>
      <Image
        source={
          store.banner
            ? {uri: store.banner}
            : require('src/assets/images/pDefault.png')
        }
        style={{
          width,
          height,
        }}
        containerStyle={styles.containerImageBg}
      />
      <Container style={styles.contentStore}>
        <View style={styles.opacityView} />
        <Avatar
          rounded
          size={60}
          source={
            store.gravatar
              ? {uri: store.gravatar}
              : require('src/assets/images/pDefault.png')
          }
        />
        <View style={styles.viewNameStore}>
          {store.featured && (
            <Text h6 style={styles.textFeatured}>
              {t('catalog:text_store_featured')}
            </Text>
          )}
          <Text style={styles.name} medium h3>
            {store.store_name}
          </Text>
          <View style={styles.viewFooter}>
            <View style={styles.viewRating}>
              <Rating
                readonly
                startingValue={ratingNumber}
              />
              <Text style={styles.count} h6 medium>
                ({count})
              </Text>
            </View>
            {onPress ? (
              <Text style={styles.visitStore} h6>
                {t('catalog:text_store_visit')}
              </Text>
            ) : (
              <Icon
                name="share"
                color={white}
                size={19}
                iconStyle={styles.iconShare}
                underlayColor="transparent"
                onPress={handleShare}
              />
            )}
          </View>
        </View>
      </Container>
    </Component>
  );
};

const styles = StyleSheet.create({
  containerImageBg: {
    borderRadius: borderRadius.large,
    overflow: 'hidden',
    // opacity: 0.6,
    // backgroundColor: black,
  },
  contentStore: {
    height: heightBg,
    marginTop: -heightBg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  opacityView: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: black,
    opacity: 0.5,
    borderRadius: borderRadius.large,
  },
  viewNameStore: {
    flex: 1,
    marginLeft: margin.large,
  },
  textFeatured: {
    color: green,
    marginBottom: 4,
  },
  name: {
    color: white,
    marginBottom: 2,
  },
  viewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRating: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    color: white,
    marginLeft: margin.small + 1,
  },
  visitStore: {
    color: white,
    marginLeft: margin.small,
  },
  iconShare: {
    marginHorizontal: margin.small - 3,
  },
});

VendorHeaderDetail.defaultProps = {
  width: widthBg,
  height: heightBg,
};
export default VendorHeaderDetail;
