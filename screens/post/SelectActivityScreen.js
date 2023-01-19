import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MainButton from '../../components/MainButton';
import ActivityTile from '../../components/ActivityTile';


import PauseButton from '../../components/PauseButton';
import Tile from '../../components/Tile';



const SelectActivityScreen = ({navigation}) => {    


    return (
        <View style={styles.main}>
            <View style={styles.question}>
                <Text style={styles.question}>What'd you do?</Text>
            </View>
            <View style={styles.activityContainer}>
                <View style={styles.firstRow}>
                    <ActivityTile title={'Chest'}></ActivityTile>
                    <ActivityTile title={'Shoulders'}></ActivityTile>
                    <ActivityTile title={'Triceps'}></ActivityTile>
                    <ActivityTile title={'Biceps'}></ActivityTile>
                </View>
                <View style={styles.firstRow}>
                    <ActivityTile title={'Quads'}></ActivityTile>
                    <ActivityTile title={'Hamstrings'}></ActivityTile>
                    <ActivityTile title={'Abs'}></ActivityTile>
                    <ActivityTile title={'Back'}></ActivityTile>
                </View>
                <View style={styles.firstRow}>
                    <ActivityTile title={'Running'}></ActivityTile>
                    <ActivityTile title={'Yoga'}></ActivityTile>
                    <ActivityTile title={'Cycling'}></ActivityTile>
                    <ActivityTile title={'Swimming'}></ActivityTile>
                </View>    
            </View>
        </View>
     );
};

export default SelectActivityScreen;

const styles = StyleSheet.create ({
    main: {
        flex: 1,
        alignItems: 'center',
        marginTop: 150,
        padding: 5,
        backgroundColor: '#F2F1F6'
    },
    question: {
        color: '#000',
        fontSize: 25,
        fontFamily: 'Lato-Bold'
    },
    activityContainer: {
        width: 346,
        height: 375,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 100,
        elevation: 12,
        shadowOpacity: 0,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },   
})