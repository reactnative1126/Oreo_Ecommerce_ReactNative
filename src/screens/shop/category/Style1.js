import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, FlatList} from 'react-native';
import {Badge, ListItem} from 'src/components';
import Container from 'src/containers/Container';
import Notification from './Notification';
import EmptyCategory from './EmptyCategory';
import {categorySelector} from 'src/modules/category/selectors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';
import {grey6} from 'src/components/config/colors';
import unescape from 'lodash/unescape';
import {excludeCategory} from 'src/utils/category';
import {exclude_categories} from 'src/config/category';

const noImage = require('src/assets/images/imgCateDefault.png');

const Style1 = ({category, goProducts}) => {
  const data = excludeCategory(category.data, exclude_categories);
  return (
    <>
      <Notification containerStyle={styles.notification} />
      {data.length < 1 ? (
        <EmptyCategory />
      ) : (
        <Container style={styles.content}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.id}`}
            data={data}
            renderItem={({item}) => (
              <ListItem
                title={unescape(item.name)}
                titleProps={{
                  h4: true
                }}
                leftAvatar={{
                  rounded: true,
                  source:
                    item.image && item.image.src
                      ? {
                        uri: item.image.src,
                        cache: 'reload',
                      }
                      : noImage,
                  size: 60,
                }}
                rightIcon={
                  <Badge
                    status="grey2"
                    value={item.count}
                    badgeStyle={styles.badge}
                    textStyle={styles.textBadge}
                  />
                }
                chevron
                onPress={() => goProducts(item)}
                style={styles.item}
                containerStyle={{paddingVertical: padding.base}}
              />
            )}
          />
        </Container>
      )}

    </>
  )
};

const styles = StyleSheet.create({
  notification: {
    marginBottom: margin.base,
    marginTop: margin.large,
  },
  content: {
    flex: 1
  },
  item: {
    marginBottom: margin.base,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: borderRadius.base + 1,
  },
  textBadge: {
    lineHeight: 18,
    color: grey6,
  },
});

const mapStateToProps = state => {
  return {
    category: categorySelector(state),
  };
};

export default connect(mapStateToProps)(Style1);
