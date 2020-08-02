import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'src/components';
import ViewLabel, { MIN_HEIGHT } from '../ViewLabel';

import { margin } from 'src/components/config/spacing';

class InputSelectValue extends React.Component {
 render() {
   const { value, label, error, style, textStyle, ...rest } = this.props;
   const checkValue = (typeof value === 'string' && value) || typeof value === 'number';
   return (
     <ViewLabel
       label={label}
       error={error}
       isHeading={checkValue}>
       <TouchableOpacity
         {...rest}
         style={[
           styles.viewInfo,
           style && style
         ]}
       >
         <Text style={[styles.text, textStyle && textStyle ]} numberOfLines={1}>{checkValue ? value: ''}</Text>
         <Icon name="chevron-down" size={14} containerStyle={styles.icon}/>
       </TouchableOpacity>
     </ViewLabel>
   )
 }
}

const styles = StyleSheet.create({
  viewInfo: {
    height: MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    marginLeft: margin.large
  },
  icon: {
    marginHorizontal: margin.large
  }
});

InputSelectValue.defaultProps = {
  label: 'Select',
};

export default InputSelectValue;
