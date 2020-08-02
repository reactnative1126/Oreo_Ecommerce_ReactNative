import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Map} from 'immutable';
import {StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {Text} from 'src/components';
import Container from 'src/containers/Container';

import {black} from 'src/components/config/colors';
import {sizes} from 'src/components/config/fonts';
import {borderRadius, margin} from 'src/components/config/spacing';
import {getTemplateConfigSelector, languageSelector} from 'src/modules/common/selectors';

import {mainStack} from 'src/config/navigator';

import NavigationServices from 'src/utils/navigation';

const Notification = ({notification, style, textStyle, language, onPress, templateConfig, containerStyle, ...rest}) => {
  const {t} = useTranslation();
  const styleTextCategory = templateConfig.getIn(['app_config', 'text_category', 'text', 'style']);
  const text = templateConfig.getIn(['app_config', 'text_category', 'text', language], '');
  const goToSales = () => {
    NavigationServices.navigate(mainStack.products, {
      name: t('common:text_sales'),
      filterBy: Map({
        on_sale: true,
      }),
    });
  };
  return (
    <Container style={containerStyle && containerStyle}>
      <TouchableOpacity onPress={goToSales}>
        <ImageBackground
          {...rest}
          source={require('src/assets/images/bg_banner.png')}
          style={[styles.bgBanner, style && style]}
        >
          <Text medium style={[styles.textSale, styleTextCategory ? styleTextCategory.toJS() : {}, textStyle && textStyle]}>
            {text}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  bgBanner: {
    borderRadius: borderRadius.large,
    width: '100%',
    height: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSale: {
    fontSize: sizes.h4,
    color: black,
    textAlign: 'center',
    marginHorizontal: margin.big,
    marginVertical: margin.large,
  },
});

const mapStateToProps = state => ({
  language: languageSelector(state),
  templateConfig: getTemplateConfigSelector(state),
});

export default connect(mapStateToProps)(Notification);
