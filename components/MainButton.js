import React from "react";
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native"

TouchableOpacity.defaultProps = { activeOpacity: 0.8};

const background = require('../assets/background.png')

const MainButton = ({ onPress, title, style}) => (
    <TouchableOpacity onPress={onPress} style={
        (style == 0) ? styles.appButtonContainer :
        (style == 1) ? styles.filledMaskButtonContainer :
        (style == 2) ? styles.outlineMaskButtonContainer :
        null}>
        
            <Text 
            style={
            (style == 1) ? styles.filledMaskButtonText :
            styles.appButtonText}>{title}</Text>

    </TouchableOpacity>
);

export default MainButton;

const styles = StyleSheet.create({
    appButtonContainer: {
        backgroundColor: '#FB581D',
        borderRadius: 100,
        width: 124,
        height: 30,
        textAlignVertical: "center",
        textAlign: "center",
        justifyContent: "center"
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        textAlignVertical: "center",
        fontFamily: 'Lato-Bold'
    },
    filledMaskButtonContainer: {
        borderRadius: 100,
        width: 124,
        height: 30,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    filledMaskButtonText: {
        fontSize: 16,
        color: "#FB551C",
        fontFamily: 'Lato-Bold',
    },
    outlineMaskButtonContainer: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
        width: 124,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});