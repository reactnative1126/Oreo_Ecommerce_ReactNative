import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { Text, Badge } from 'src/components';

import { red, yellow } from 'src/components/config/colors';
import fonts, { lineHeights, sizes } from 'src/components/config/fonts';
import { margin } from 'src/components/config/spacing';

export function Price(props) {
  const { price_format, h4, type, isPercentSale, style } = props;
  const { t } = useTranslation();

  const h = h4 ? 'h4' : 'h5';
  const hSmall = h4 ? 'h5' : 'h6';

  const lineHeight = lineHeights[h];

  const styleText = {
    fontSize: sizes[h],
    lineHeight,
  };
  const styleTextSmall = {
    fontSize: sizes[hSmall],
    lineHeight,
  };

  if (!price_format.regular_price && !price_format.sale_price) {
    return (
      <Text medium style={[{ color: yellow }, styleText, style && style]}>
        Updating cost...
      </Text>
    );
  }

  if (type === 'variable' || type === 'grouped') {
    return (
      <Text colorThird style={[styleTextSmall, style && style]}>
        {`${t('common:text_from')} `}
        <Text medium style={styleText}>
          {price_format.regular_price}
        </Text>
      </Text>
    );
  }

  if (price_format.sale_price) {
    return (
      <View style={[styles.viewPrice, style && style]}>
        <Text colorSecondary style={[styleText, styles.textPriceSale]}>
          {price_format.regular_price}
        </Text>
        <Text medium style={[styleText, styles.textSale]}>
          {price_format.sale_price}
        </Text>
        {isPercentSale && (
          <Badge
            status="error"
            value={t('common:text_sale_percent', {percent: price_format.percent_sale})}
            containerStyle={styles.viewBadge}
            badgeStyle={styles.badge}
            textStyle={styles.textBadge}
          />
        )}
      </View>
    );
  }

  return (
    <Text medium style={[styleText, style && style]}>
      {price_format.regular_price}
    </Text>
  );
}

const styles = StyleSheet.create({
  viewPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    lineHeight: lineHeights.base,
  },
  textPriceSale: {
    textDecorationLine: 'line-through',
    marginRight: margin.small,
  },
  textSale: {
    color: red,
  },
  viewBadge: {
    marginHorizontal: margin.small,
  },
  badge: {
    height: 14,
  },
  textBadge: {
    lineHeight: 14,
    ...fonts.regular,
  },
});

Price.defaultProps = {
  price_format: {
    regular_price: 0,
    sale_price: 0,
  },
  h4: false,
  isPercentSale: false,
};

export default Price;
