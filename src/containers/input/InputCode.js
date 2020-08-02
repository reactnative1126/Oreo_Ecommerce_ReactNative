import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFiledRoot: {marginTop: 20, marginBottom: 50},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 6;

const App = ({ onFulfill }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                onBlur={() => onFulfill(value)}
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                autoFocus={true}
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
};

export default App;
