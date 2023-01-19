import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, ImageBackground, View } from "react-native"
import { sharedLocalState } from "../states/LocalState";

TouchableOpacity.defaultProps = { activeOpacity: 0.8};

const PostOptions = ({navigation, onPress}) => {
    return (
    <TouchableOpacity title={''} onPress={onPress} style={styles.active}>
        <View style={styles.combinedDots}> 
            <View style={styles.singleDot}/>
            <View style={styles.singleDot}/>
            <View style={styles.singleDot}/>
        </View>
    </TouchableOpacity>
    );
};

export default PostOptions;

const styles = StyleSheet.create({
    combinedDots: {
        
        
        flexDirection: 'row',
        position: 'absolute'
        

    },
    singleDot: {
        backgroundColor: '#000',
        width: 4,
        height: 4,
        borderRadius: 100,
        marginLeft: 1.2,
        marginRight: 1.2
        
    }
});