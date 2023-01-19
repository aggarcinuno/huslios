import React from "react";
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native"
import { TouchableHighlight } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import Ionicons from 'react-native-vector-icons/Ionicons';

TouchableHighlight.defaultProps = { activeOpacity: 0.8};

const BackButton = ({disabled, onPress, title, style, color}) => (

    <TouchableOpacity title={'ok'} onPress={onPress} style={styles.backButton}>
        <Ionicons name={'arrow-back-outline'} size={28} color={color} />
    </TouchableOpacity>
    
);

export default BackButton;

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        left: 20,
        top: 2
    },
});