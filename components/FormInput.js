import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight } from '../utils/Dimensions';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
    return (
        <View style={styles.main}>
            <TextInput
                value={labelValue}
                placeholder={placeholderText}
               
                placeholderTextColor="#fff"
                numberOfLines={1}
                {...rest}
            />
        </View>
    );
};

export default FormInput;


const styles = StyleSheet.create({
    main: {
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})

