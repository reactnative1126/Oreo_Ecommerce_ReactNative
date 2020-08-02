import React from 'react';
import { useTranslation } from 'react-i18next';

import { View } from 'react-native';
import { Text } from 'src/components';
import { Row, Col } from 'src/containers/Gird';
import LineReviewProduct from './LineReviewProduct';

import { margin } from 'src/components/config/spacing';

const TextVisit = ({ widthLeft, visit }) => {
  const { t } = useTranslation();
  return (
    <Text medium h6 style={styles.leftTitle(widthLeft)}>
      {t('catalog:text_visit_star', { visit: visit })}
    </Text>
  );
};

class ChartReview extends React.Component {
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
    const { widthLeft, widthRight } = this.state;
    const { lists, total } = this.props;
    const valueList = lists.sort((a,b) => a.key < b.key);

    return (
      <View style={styles.container}>
        {valueList.map(list => (
          <Row style={styles.row} key={list.key}>
            <View
              onLayout={({
                nativeEvent: {
                  layout: { width },
                },
              }) => this.heightTable(width, 'widthLeft')}
            >
              <TextVisit widthLeft={widthLeft} visit={list.key} />
            </View>
            <Col style={styles.col}>
              <LineReviewProduct value={list.value} total={total} />
            </Col>
            <View
              onLayout={({
                nativeEvent: {
                  layout: { width },
                },
              }) => this.heightTable(width, 'widthRight')}
            >
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
    marginTop: margin.big,
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

export default ChartReview;
