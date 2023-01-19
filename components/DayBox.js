import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native"
import { sharedLocalState } from "../states/LocalState";

TouchableOpacity.defaultProps = { activeOpacity: 0.8};

const DayBox = ({title}) => {

 

    return (

    <TouchableOpacity onPress={null} style={styles.active}>
        <Text style={styles.textActive}> {title} </Text>
    </TouchableOpacity>
    );
};

export default DayBox;

const styles = StyleSheet.create({
    active: {
        backgroundColor: '#FB581D',
    
        borderRadius: 10,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textActive: {
        fontFamily: 'Lato-Bold',
        color: '#fff',
        fontSize: 20,
    },
    notActive: {
        borderWidth: 2.5,
        borderColor: '#B9B9B9',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 15,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textNotActive: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: '#B9B9B9'
    }
});