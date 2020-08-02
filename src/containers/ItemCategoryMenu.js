import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Icon } from 'src/components';
import { padding } from 'src/components/config/spacing';
import unescape from 'lodash/unescape';

import { mainStack } from 'src/config/navigator';
import {excludeCategory} from "../utils/category";
import {exclude_categories_sidebar} from "../config/category";

class ItemCategoryMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSub: false,
    };
  }
  componentDidUpdate(preProps) {
    if (preProps.isOpen && !this.props.isOpen) {
      this.setState({
        isShowSub: false,
      });
    }
  }
  handleGoProducts = category => {
    const params = {
      id: category.id,
      name: unescape(category.name),
    };
    this.props.goProducts(mainStack.products, params);
  };

  render() {
    const { category } = this.props;
    const { isShowSub } = this.state;
    if (!category) {
      return null;
    }

    const { categories } = category;
    const data = excludeCategory(categories, exclude_categories_sidebar);

    return (
      <>
        <ListItem
          title={unescape(category.name)}
          titleProps={{
            medium: true,
          }}
          titleStyle={styles.textItem}
          rightElement={
            data.length > 0 && (
              <Icon
                name={isShowSub ? 'minus' : 'plus'}
                size={14}
                iconStyle={styles.icon}
                activeOpacity={1}
                underlayColor={'transparent'}
                onPress={() => this.setState({ isShowSub: !isShowSub })}
              />
            )
          }
          type="underline"
          small
          onPress={() => this.handleGoProducts(category)}
        />
        {data.length > 0 && isShowSub && (
          <View style={styles.viewSubs}>
            {data.map(subC => (
              <ListItem
                key={subC.id}
                title={unescape(subC.name)}
                titleProps={{
                  medium: true,
                }}
                type="underline"
                small
                containerStyle={styles.itemSub}
                onPress={() => this.handleGoProducts(subC)}
              />
            ))}
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  textItem: {
    paddingHorizontal: padding.large,
  },
  icon: {
    padding: padding.large,
  },
  viewSubs: {
    paddingLeft: padding.large,
  },
  itemSub: {
    paddingHorizontal: padding.large,
  },
});

ItemCategoryMenu.defaultProps = {
  subCategories: [],
  isOpen: false,
  goProducts: () => {},
};

export default ItemCategoryMenu;
