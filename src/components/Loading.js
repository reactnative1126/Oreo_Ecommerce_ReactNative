import React, {Component} from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';
import { withTheme, spacing } from './config';

class Loading extends Component {
  render() {
    const { color, visible } = this.props;
    return (
      <Modal
        animationType="none"
        transparent
        visible={visible}
      >
        <View
          style={[
            styles.viewLoading
          ]}
        >
          <ActivityIndicator size='small' color={color}/>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default withTheme(Loading, 'Loading');
