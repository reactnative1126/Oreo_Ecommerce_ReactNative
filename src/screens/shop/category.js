import React, {Component} from 'react';
import {connect} from 'react-redux';
import unescape from 'lodash/unescape';
import {StyleSheet, View} from 'react-native';
import {ThemedView} from 'src/components';

import Search from 'src/screens/home/containers/Search';
import Style1 from './category/Style1';
import Style2 from './category/Style2';
import Style3 from './category/Style3';
import Style4 from './category/Style4';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {getTemplateConfigSelector, languageSelector} from 'src/modules/common/selectors';

import {padding} from 'src/components/config/spacing';

import {categoryListType} from 'src/config/category';

import {mainStack} from 'src/config/navigator';

class CategoryScreen extends Component {

  goProducts = item => {
    this.props.navigation.navigate(mainStack.products, {
      id: item.id,
      name: unescape(item.name),
    });
  };
  render() {
    const {
      screenProps: {t},
      templateConfig,
      language,
    } = this.props;
    const type = templateConfig.getIn(['app_config', 'layout_category']) || categoryListType.category1;

    return (
      <ThemedView isFullView style={styles.container}>
        <View style={styles.viewSearch}>
          <Search
            fields={{
              placeholder: {
                text: {
                  [language]: t('catalog:text_placeholder_search'),
                },
              },
            }}
          />
        </View>
        {type === categoryListType.category4 ?
          (
            <Style4
              goProducts={this.goProducts}
            />
          ) : type === categoryListType.category3 ?
          (
            <Style3
              goProducts={this.goProducts}
            />
          ) : type === categoryListType.category2 ? (
            <Style2
              goProducts={this.goProducts}
            />
          ) : (
            <Style1
              goProducts={this.goProducts}
            />
          )}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
  viewSearch: {
    padding: padding.large,
  },
});

const mapStateToProps = state => {
  return {
    templateConfig: getTemplateConfigSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(CategoryScreen);
