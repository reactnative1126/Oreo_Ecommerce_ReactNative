import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';

import {Header, Text, ListItem, ThemedView, Avatar} from 'src/components';
import Container from 'src/containers/Container';
import Button from 'src/containers/Button';
import { TextHeader, CartIcon, IconHeader } from 'src/containers/HeaderComponent';
import { margin, padding } from 'src/components/config/spacing';
import { red, green, blue, white } from 'src/components/config/colors';

const data = {
  id: '8',
  name: 'Hot Deal Sale 50%',
  isCreated: '12/12/2019',
  description:
    'Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum. Lorem Ipsum is simply dum.',
  isRead: false,
  type: 'order',
};

class DetailNotification extends React.Component {
  avatarLeft = type => {
    console.log('type', type)
    const icon = type === 'percent' ? 'percent' : type === 'order' ? 'file-text' : 'gift';
    const bgColor = type === 'percent' ? red : type === 'order' ? green : blue;
    return (
        <Avatar
            icon={{
              name: icon,
              size: 17,
              color: white
            }}
            rounded
            size={42}
            overlayContainerStyle={{ backgroundColor: bgColor}}
        />
    );
  };

  render() {
    return (
      <ThemedView style={styles.container}>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title="Notification" />}
          rightComponent={<CartIcon />}
        />
        <ScrollView contentContainerStyle={styles.scrollview}>
          <Container style={styles.content}>
            <ListItem
              title={data.name}
              subtitle={data.isCreated}
              leftAvatar={this.avatarLeft(data.type)}
              style={styles.item}
              containerStyle={styles.containerItem}
              titleStyle={styles.titleItem}
              titleProps={{
                h3: true,
                medium: true,
              }}
              subtitleStyle={[styles.subtitleItem]}
              pad={20}
            />
            <Text colorSecondary style={styles.textDescription}>
              {data.description}
            </Text>
          </Container>
          <Container style={styles.footer}>
            <Button title="Delete" type="outline" />
          </Container>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  item: {
    marginBottom: margin.large,
  },
  containerItem: {
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    paddingVertical: padding.large,
    paddingHorizontal: 0,
  },
  titleItem: {
    lineHeight: 28,
    marginBottom: 0,
    marginTop: -5,
  },
  subtitleItem: {
    lineHeight: 17,
  },
  textDescription: {
    lineHeight: 24,
  },
  footer: {
    marginVertical: margin.large,
  },
});

export default DetailNotification;
