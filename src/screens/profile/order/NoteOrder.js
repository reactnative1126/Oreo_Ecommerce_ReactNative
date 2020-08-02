import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Text, ThemedView } from 'src/components';

import fetch from 'src/utils/fetch';
import { borderRadius, margin, padding } from 'src/components/config/spacing';

import { strDate2 } from './config';

class NoteOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchNote();
  }

  fetchNote = async () => {
    try {
      const { id } = this.props;
      if (id) {
        const URL = `/wc/v3/orders/${id}/notes?type=customer`;
        const data = await fetch(URL);
        this.setState({
          loading: false,
          data: data,
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };
  render() {
    const { loading, data } = this.state;
    if (loading) {
      return <ActivityIndicator style={styles.viewLoading} size="small" />;
    }
    return data.map((note, index) => (
      <ThemedView
        key={note.id}
        colorSecondary
        style={[styles.viewNote, index === data.length - 1 && styles.viewNoteLastest]}
      >
        <Text colorSecondary style={styles.textName}>
          {note.note}
        </Text>
        <Text h6 colorThird>
          {strDate2(note.date_created)}
        </Text>
      </ThemedView>
    ));
  }
}

const styles = StyleSheet.create({
  viewLoading: {
    marginVertical: margin.large,
  },
  viewNote: {
    borderRadius: borderRadius.base,
    padding: padding.large,
    marginBottom: margin.base,
  },
  viewNoteLastest: {
    marginBottom: 0,
  },
  textName: {
    marginBottom: margin.small,
  },
});

export default NoteOrder;
