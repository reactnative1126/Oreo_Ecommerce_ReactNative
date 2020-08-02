import React from 'react';
import {useTranslation, withTranslation} from 'react-i18next';
import isEqual from 'lodash/isEqual';
import {StyleSheet, Modal, View, ScrollView} from 'react-native';
import {ThemedView, Text, Header, ListItem, ThemeConsumer} from 'src/components';
import {TextHeader, IconHeader} from 'src/containers/HeaderComponent';
import RadioIcon from '../containers/RadioIcon';
import Container from 'src/containers/Container';
import Button from 'src/containers/Button';

import {margin} from 'src/components/config/spacing';

class ModalFilter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: props.select,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.visible && prevProps.visible !== this.props.visible && this.props.select !== this.state.selectValue) {
      this.setState({
        selectValue: this.props.select,
      });
    }
  }

  goResult = () => {
    this.props.setModalVisible(false);
    this.props.handleSort(this.state.selectValue);
  };

  render() {
    const {visible, setModalVisible, t} = this.props;
    const {selectValue} = this.state;
    const sortBy = [
      {
        key: 'popularity',
        title: t('catalog:text_sort_popular'),
        query: {orderby: 'popularity'},
      },
      {
        key: 'rating',
        title: t('catalog:text_sort_rating'),
        query: {orderby: 'rating'},
      },
      {
        key: 'date',
        title: t('catalog:text_latest'),
        query: {},
      },
      {
        key: 'price',
        title: t('catalog:text_sort_price_low'),
        query: {order: 'asc', orderby: 'price'},
      },
      {
        key: 'price-desc',
        title: t('catalog:text_sort_price_high'),
        query: {order: 'desc', orderby: 'price'},
      },
    ];

    return (
      <Modal visible={visible} transparent onRequestClose={() => setModalVisible(false)}>
        <ThemedView isFullView>
          <Header
            containerStyle={{paddingTop: 0}}
            leftComponent={<IconHeader name="x" size={24} onPress={() => setModalVisible(false)}/>}
            centerComponent={<TextHeader title={t('common:text_refine')} />}
            rightComponent={<TextHeader title={t('common:text_clear_all')} type="button" onPress={() => this.setState({selectValue: {}})} />}
          />
          <ScrollView>
            <Container>
              <Text h3 medium style={styles.textSort}>
                {t('catalog:text_sort')}
              </Text>
              {sortBy.map(item => (
                <ListItem
                  key={item.key}
                  title={item.title}
                  type="underline"
                  small
                  rightIcon={
                    <RadioIcon isSelect={isEqual(item, selectValue)} />
                  }
                  containerStyle={styles.item}
                  onPress={() => this.setState({selectValue: item})}
                />
              ))}
            </Container>
          </ScrollView>
          <Container style={{marginVertical: 26}}>
            <Button title={t('catalog:text_result')} onPress={this.goResult} />
          </Container>
        </ThemedView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textSort: {
    marginTop: margin.large,
  },
  textFilter: {
    marginTop: margin.big + margin.small,
  },
});

export default withTranslation()(ModalFilter);
