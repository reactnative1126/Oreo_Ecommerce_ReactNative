import React, {Component} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text, Avatar, ThemeConsumer} from 'src/components';
import Container from 'src/containers/Container';
import {margin} from 'src/components/config/spacing';

const users = [
  {
    id: '1',
    first_name: 'Wclovers',
    last_name: '',
    avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSg35HXopiSTcbvsKPZ2pscOGxiP7S90TesNXkkceARcv8TLQK5A&s',
  },
  {
    id: '2',
    first_name: 'Onlinepouchao',
    last_name: '',
    avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSg35HXopiSTcbvsKPZ2pscOGxiP7S90TesNXkkceARcv8TLQK5A&s',
  },
  {
    id: '3',
    first_name: 'Demo',
    last_name: 'Delivery',
    avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSg35HXopiSTcbvsKPZ2pscOGxiP7S90TesNXkkceARcv8TLQK5A&s',
  },
];

class FollowStore extends Component {
  render() {
    const {store} = this.props;
    return (
      <ThemeConsumer>
        {({theme}) => (
          <Container style={styles.container}>
            <Text h4 medium style={styles.textCount}>{store && store.follows} Follows</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={users}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.item,
                    {borderColor: theme.colors.border},
                    index === 0 && {borderTopWidth: 1},
                  ]}>
                  <Avatar
                    source={
                      item.avatar_url
                        ? {uri: item.avatar_url}
                        : require('src/assets/images/pDefault.png')
                    }
                    rounded
                    size={60}
                  />
                  <Text medium style={styles.name}>
                    {item.first_name} {item.last_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Container>
        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textCount: {
    marginBottom: margin.base,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: margin.large - 2,
    borderBottomWidth: 1,
  },
  name: {
    flex: 1,
    marginLeft: margin.base,
  },
});

export default FollowStore;
