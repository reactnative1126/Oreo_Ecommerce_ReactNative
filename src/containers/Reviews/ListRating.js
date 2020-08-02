import React from 'react';
import {withTranslation} from 'react-i18next';

import {View} from 'react-native';
import {Text} from 'src/components';
import {Row, Col} from 'src/containers/Gird';
import LineReview from './LineReview';

import {margin} from 'src/components/config/spacing';

class ListRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthLeft: 0,
      widthRight: 0,
    };
  }

  heightTable = (width, type) => {
    if (this.state[type] < width) {
      this.setState({
        [type]: width,
      });
    }
  };

  render() {
    const {lists, total, style, t} = this.props;
    const {widthLeft, widthRight} = this.state;
    const valueList = lists.sort((a, b) => a.key < b.key);
    return (
      <View style={[styles.container, style && style]}>
        {valueList.map(list => (
          <Row style={styles.row} key={list.key}>
            <View
              onLayout={({
                nativeEvent: {
                  layout: {width},
                },
              }) => this.heightTable(width, 'widthLeft')}>
              <Text medium h6 style={styles.leftTitle(widthLeft)}>
                {t('catalog:text_visit_star', {visit: list.key})}
              </Text>
            </View>
            <Col style={styles.col}>
              <LineReview value={list.value} total={total} />
            </Col>
            <View
              onLayout={({
                nativeEvent: {
                  layout: {width},
                },
              }) => this.heightTable(width, 'widthRight')}>
              <Text medium h6 style={styles.rightTitle(widthRight)}>
                {list.value}
              </Text>
            </View>
          </Row>
        ))}
      </View>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    marginLeft: 6,
    marginRight: 6,
    // marginTop: margin.big,
  },
  row: {
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
    marginBottom: margin.small,
  },
  col: {
    paddingLeft: 21,
    paddingRight: 21,
  },
  leftTitle: width => ({
    minWidth: width,
  }),
  rightTitle: width => ({
    minWidth: width,
    textAlign: 'center',
  }),
};

export default withTranslation()(ListRating);
