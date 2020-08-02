import React from 'react';
import {View} from 'react-native';
import {ThemeConsumer} from 'src/components';
import Container from 'src/containers/Container';
class Divider extends React.Component {
  render() {
    const {fields} = this.props;
    if (!fields) {
      return null;
    }
    const box = fields.boxed;
    const height =
      fields.height && parseInt(fields.height) ? parseInt(fields.height) : 1;
    const styleDivider = fields.style;
    const color = fields.color;

    return (
      <ThemeConsumer>
        {({theme}) => (
          <Container disable={!box ? 'all' : 'null'}>
            <View style={{height: height, overflow: 'hidden'}}>
              <View
                style={{
                  borderWidth: height,
                  borderColor: color ? color : theme.colors.primary,
                  borderStyle: styleDivider,
                  borderRadius: styleDivider === 'solid' ? 0 : 1,
                }}
              />
            </View>
          </Container>
        )}
      </ThemeConsumer>
    );
  }
}
export default Divider;
