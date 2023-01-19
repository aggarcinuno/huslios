import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from "react-native"
import { sharedLocalState } from "../states/LocalState";

TouchableOpacity.defaultProps = { activeOpacity: 0.8};

const ActivityTile = ({title}) => {

    const [isPressed, setIsPressed] = useState(false);
    const {postArray} = sharedLocalState();


        useEffect(() => {

            const pressEffect = () => {
                if (isPressed) {
                    postArray.push(title)
                } 
                if (!isPressed) {
                    postArray.pop()
                }
                console.log(postArray)
            }
            pressEffect();
        }, [isPressed])

    return (

    <TouchableOpacity onPress={() => setIsPressed(!isPressed)} style={(isPressed) ? styles.pressed : styles.notPressed}>
        <Text style={(isPressed) ? styles.textPressed : styles.textNotPressed}> {title} </Text>
    </TouchableOpacity>
    );
};

export default ActivityTile;

const styles = StyleSheet.create({
    pressed: {
        borderWidth: 2.5,
        borderColor: '#FF5D59',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 15,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textPressed: {
        fontFamily: 'Lato-Bold',
        color: '#FF5D59',
        fontSize: 12,
    },
    notPressed: {
        borderWidth: 2.5,
        borderColor: '#D5D5D7',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 15,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textNotPressed: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: '#D5D5D7'
    }
});