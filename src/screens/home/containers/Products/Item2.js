import React from 'react';
import {compose} from 'redux';
import {withNavigation} from 'react-navigation';
import {useTranslation} from 'react-i18next';
import unescape from 'lodash/unescape';

import {StyleSheet, ActivityIndicator, View, TouchableOpacity} from 'react-native';
import {Text, Image, withTheme, Badge} from 'src/components';
import Price from 'src/containers/Price';
import WishListIcon from 'src/containers/WishListIcon';

import {margin, padding} from 'src/components/config/spacing';
import {mainStack} from 'src/config/navigator';

const Item2 = ({item, width, height, navigationType, style, theme, navigation}) => {
  if (!item) {
    return null;
  }

  const {t} = useTranslation();

  const {name, images, price_format, on_sale, is_new, type, id} = item;

  const productItemImageStyle = {
    width,
    height,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {borderColor: theme.colors.border},
        style && style
      ]}
      onPress={() => navigation[navigationType](mainStack.product, { product: item })}
    >
      <Image
        source={
          images && images.length
            ? { uri: images[0].shop_single, cache: 'reload' }
            : require('src/assets/images/pDefault.png')
        }
        style={productItemImageStyle}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={styles.content}>
        <Text medium colorSecondary style={styles.name}>{unescape(name)}</Text>
        <Price price_format={price_format} type={type}/>
        <View style={styles.viewBadge}>
          {is_new ? <Badge value={t('common:text_new')} status="success" containerStyle={styles.badge} /> : null}
          {on_sale ? <Badge value={t('common:text_sale')} status="warning" /> : null}
        </View>
      </View>
      <View>
        <WishListIcon product_id={id} size={16}/>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: padding.small,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: margin.large + 4,
  },
  name: {
    marginBottom: 4,
  },
  viewBadge: {
    flexDirection: 'row',
    marginTop: margin.small - 2,
  },
  badge: {
    marginRight: margin.small,
  },
});

Item2.defaultProps = {
  width: 78,
  height: 93,
  navigationType: 'navigate',
};
export default compose(
  withTheme,
  withNavigation
)(Item2);
