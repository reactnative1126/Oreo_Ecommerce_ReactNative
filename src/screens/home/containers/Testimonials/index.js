import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, ThemedView} from 'src/components'
import Container from 'src/containers/Container';
import TestimonialItem1 from './Style1';
import TestimonialItem2 from './Style2';

import {languageSelector} from 'src/modules/common/selectors';
import {borderRadius, padding} from 'src/components/config/spacing';

class Testimonials extends React.Component {
  render() {
    const {layout, fields, language} = this.props;
    if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
      return null;
    }

    const valueWidth = fields.width && parseInt(fields.width)? parseInt(fields.width) : 317;
    const valuePad = fields.pad && parseInt(fields.pad)? parseInt(fields.pad) : 0;
    const valueBox = fields.boxed;
    const items = fields.items || [];

    const disableContainer = valueBox ? 'right' : 'all';
    const Component = layout === 'style2' ? TestimonialItem2 : TestimonialItem1;

    return (
      <Container disable={disableContainer}>
        {items.length < 1 ? (
          <Text>No Testimonials</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {items.map((item, index) => (
              <ThemedView
                key={index}
                colorSecondary
                style={[
                  styles.item,
                  {
                    width: valueWidth,
                    marginRight: index < items.length - 1
                      ? valuePad
                      : valueBox
                        ? padding.large
                        : 0
                  }
                ]}
              >
                <Component
                  item={item}
                  language={language}
                />
              </ThemedView>
            ))}
          </ScrollView>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: borderRadius.large,
    paddingHorizontal: padding.large + 4,
    paddingVertical: padding.big + 3,
  },
});

const mapStateToProps = state => ({
  language: languageSelector(state),
});

export default connect(mapStateToProps)(Testimonials);
