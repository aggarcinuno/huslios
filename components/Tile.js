import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native"

TouchableOpacity.defaultProps = { activeOpacity: 0.8};

const Tile = ({ onPress, title, }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
);

export default Tile;

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 0,
        borderStyle: "solid",
        backgroundColor: "#fff",
        borderColor: "#d5d5d7",
        borderWidth: 1.5,
        borderRadius: 100,
        width: 124,
        height: 30,
        textAlignVertical: "center",
        textAlign: "center",
        justifyContent: "center"

    },
    appButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#d5d5d7",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        textAlignVertical: "center"

    }
});