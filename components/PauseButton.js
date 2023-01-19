import React from "react";
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View } from "react-native"

TouchableOpacity.defaultProps = { activeOpacity: 0.8};

const pausebutton = require('../assets/pausebutton.png');
const background = require('../assets/background.png')

const PauseButton = ({disabled, onPress, title, style}) => (

    <TouchableOpacity disabled={disabled} onPress={onPress} style={
    (style == 0 ) ? styles.appButtonContainer : 
    (style == 1) ? styles.appButtonContainerOutline : 
    (style == 2) ? styles.appButtonContainerUnclickable : 
    (style == 3) ? styles.appButtonContainer : null} >

        {(style ==0) ? <View style={styles.box}/>  : null}


                

                <Text style={
                (style == 1) ? styles.appButtonTextOutline : 
                styles.appButtonText}>{title}</Text>
                
    </TouchableOpacity>
    
);

export default PauseButton;

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        borderRadius: 100,
        backgroundColor: '#FB581D',
        width: 74,
        height: 74,
        justifyContent: 'center',
    },
    appButtonContainerOutline: {
        elevation: 8,
        borderStyle: "solid",
        backgroundColor: '#F2F1F6',
        borderColor: "#FB6420",
        borderWidth: 2,
        borderRadius: 100,
        width: 74,
        height: 74,
        justifyContent: "center"
    },
    appButtonContainerUnclickable: {
        elevation: 8,
        backgroundColor: "#D5D5D7",
        borderRadius: 100,
        width: 74,
        height: 74,
        textAlignVertical: "center",
        textAlign: "center",
        justifyContent: "center"
    },
    appButtonText: {
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        color: "#fff",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        textAlignVertical: "center"
    },
    appButtonTextOutline: {
        fontSize: 16,
        right: 3,
        left: 0,
        fontFamily: 'Lato-Bold',
        color: "#FB6420",
        textAlign: "center",
        alignSelf: 'center',
        position: 'absolute',
        
        textAlignVertical: "center"
    },
    box: {
        backgroundColor: '#fff',
        alignSelf: 'center',

        width: 25,
        height: 25,
        top: 8
    }
});