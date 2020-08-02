import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import unescape from 'lodash/unescape';
import {ScrollView, StyleSheet, View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import {ThemedView, Text, Image} from 'src/components';
import EmptyCategory from './EmptyCategory';
import ParentCategory from './ParentCategory';

import {categorySelector} from 'src/modules/category/selectors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';
import {excludeCategory} from 'src/utils/category';
import {exclude_categories} from 'src/config/category';

const noImage = require('src/assets/images/imgCateDefault.png');
const {width} = Dimensions.get('window');

const pad = padding.small;
const widthTabParent = 124;
const sizeItem = (width - widthTabParent - (2 * margin.small) - (2 * pad) -(2* padding.large))/3;

class Style2 extends React.Component {
  constructor(props) {
    super(props);
    const {
      category: {data},
    } = props;
    const listParent = excludeCategory(data, exclude_categories);
    const parent = listParent[0] ? listParent[0] : null;
    this.state = {
      listParent,
      parent,
    };
  }
  changeParent = item => {
    this.setState({
      parent: item,
    });
  };

  render() {
    const {t, goProducts} = this.props;
    const {listParent, parent} = this.state;

    if (listParent.length < 1) {
      return <EmptyCategory />;
    }

    // const childCategories = parent && parent.categories ? parent.categories : [];

    const _childCategories = parent && parent.categories ? parent.categories : [];
    const childCategories = excludeCategory(_childCategories, exclude_categories);

    return (
      <ThemedView colorSecondary isFullView style={styles.container}>
        <ParentCategory data={listParent} selectVisit={parent} onChange={this.changeParent} width={widthTabParent}/>
        <View style={styles.content}>
          {childCategories.length < 1 ? (
            <ThemedView isFullView>
              <EmptyCategory />
            </ThemedView>
            ) : (
            <>
              <ThemedView>
                <TouchableOpacity onPress={() => goProducts(parent)} style={styles.viewTextParent}>
                  <Text h5 medium style={styles.nameParent}>
                    {t('catalog:text_shop_name', {name: parent && parent.name ? unescape(parent.name): ''})}
                  </Text>
                  <Text h6 colorThird>
                    {t('catalog:text_view_all_category')}
                  </Text>
                </TouchableOpacity>
              </ThemedView>
              <ScrollView>
                <ThemedView style={styles.viewChildren}>
                  {childCategories.map((item => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.item,
                        {width: sizeItem}
                      ]}
                      onPress={() => goProducts(item)}
                    >
                      <Image
                        source={item && item.image && item.image.src ? {uri: item.image.src} : noImage}
                        style={{
                          width: sizeItem,
                          height: sizeItem,
                        }}
                        containerStyle={styles.image}
                      />
                      <Text h6 style={styles.name}>{unescape(item.name)}</Text>
                    </TouchableOpacity>
                  )))}
                </ThemedView>
              </ScrollView>
            </>
          )}
        </View>
      </ThemedView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    margin: margin.small,
  },
  viewTextParent: {
    marginVertical: margin.large + 4,
    paddingHorizontal: padding.large,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameParent: {
    flex: 1,
    marginRight: margin.base,
  },
  viewChildren: {
    paddingHorizontal: padding.large,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -pad/2,
  },
  item: {
    marginHorizontal: pad/2,
    marginBottom: margin.big,
  },
  image: {
    borderRadius: borderRadius.base,
    overflow: 'hidden',
  },
  name: {
    textAlign: 'center',
    marginTop: margin.small + 1,
  }
});

Style2.defaultProps = {
  goProducts: () => {}
};

const mapStateToProps = state => {
  return {
    category: categorySelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(Style2));
