import React from 'react';
import truncate from 'lodash/truncate';
import { StyleSheet, View, FlatList } from 'react-native';
import { Header, ListItem, ThemedView, Avatar } from 'src/components';
import { TextHeader, IconHeader, CartIcon } from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import { Dot } from 'src/containers/Pagination';

import { red, green, blue, grey3 } from 'src/components/config/colors';
import { margin, padding } from 'src/components/config/spacing';
import { profileStack } from 'src/config/navigator';

const data = [
  {
    id: '1',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: true,
    type: 'percent',
  },
  {
    id: '2',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: false,
    type: 'gift',
  },
  {
    id: '3',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: true,
    type: 'order',
  },
  {
    id: '4',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: true,
    type: 'order',
  },
  {
    id: '5',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: true,
    type: 'order',
  },
  {
    id: '6',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: false,
    type: 'gift',
  },
  {
    id: '7',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: true,
    type: 'percent',
  },
  {
    id: '8',
    name: 'Hot Deal Sale 50%',
    isCreated: '12/12/2019',
    description:
      'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
    isRead: false,
    type: 'order',
  },
];

class NotificationList extends React.Component {
  avatarLeft = type => {
    const {
      screenProps: { theme },
    } = this.props;
    const icon = type === 'percent' ? 'percent' : type === 'order' ? 'file-text' : 'gift';
    const bgColor = type === 'percent' ? red : type === 'order' ? green : blue;
    return (
      <Avatar
        icon={{
          name: icon,
          size: 17,
          color: theme.colors.white
        }}
        rounded
        size={42}
        overlayContainerStyle={{ backgroundColor: bgColor}}
      />
    )
  };

  itemNotification = ({ item }) => {
    const { navigation } = this.props;

    const description = truncate(item.description, {
      length: 26,
      omission: '',
    });
    const subtitle = `${item.isCreated}\n${description}`;

    return (
      <Container>
        <ListItem
          title={item.name}
          subtitle={subtitle}
          style={styles.item}
          containerStyle={styles.containerItem}
          titleStyle={styles.titleItem}
          titleProps={{
            h4: true,
            medium: true,
          }}
          leftAvatar={this.avatarLeft(item.type)}
          rightIcon={<Dot color={item.isRead ? green : grey3} style={styles.dot} />}
          pad={20}
          onPress={() => navigation.navigate(profileStack.notification_detail)}
        />
      </Container>
    );
  };

  render() {
    const { screenProps: { t }} = this.props;
    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_notification')} />}
          rightComponent={<CartIcon />}
        />
        <FlatList
          data={data}
          keyExtractor={item => `${item.id.toString()}`}
          renderItem={this.itemNotification}
          ListFooterComponentStyle={<View style={styles.footer}/>}
        />
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    marginTop: margin.large,
  },
  item: {
    marginBottom: margin.large,
  },
  containerItem: {
    alignItems: 'flex-start',
    paddingVertical: padding.large,
  },
  titleItem: {
    // fontSize: sizes.h4,
    // ...fonts.medium
    lineHeight: 23,
    // marginBottom: margin.small,
  },
  dot: {
    marginVertical: 3,
  },
});

export default NotificationList;
