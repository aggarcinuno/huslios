import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import MainButton from '../../components/MainButton';
import RestButton from '../../components/RestButton';
import { AuthContext } from '../../states/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore'
import moment from 'moment';





const CheckInScreen = ({navigation}) => {

    const [restPressed, setRestPressed] = useState(false);
    const {user} = useContext(AuthContext)

    let currentDay = Number(moment().format('YYYYMMDD'))

    const choseRest = async () => {
        await firestore()
                .collection(`users`).doc(`${user.uid}`).collection(`activities`).doc(`${currentDay}`).set({
                    day: currentDay,
                    activities: [],
                    duration: 0
                }).then(() => {
                    console.log('Activities Added!');
                }).catch((error) => {
                    console.log('Something went wrong with added post to firebase', error);
                });
        AsyncStorage.setItem('hasPosted', 'true')
        navigation.navigate('FeedyFeedy')
    }
    

    return (
        <View style={styles.home}>
                <View style={styles.rectangleView}>
                {restPressed ? <Text style={styles.startAnActivity}>Are you sure?</Text>
                             : <Text style={styles.startAnActivity}>Start an activity?</Text>}
                    <View style ={styles.rectanglePressable}>        
                        <RestButton title={restPressed ? 'Yes' : 'Rest'} onPress={restPressed ? () => {choseRest()} : () => {setRestPressed(!restPressed)
                        }}/>       
                    </View>
                    <View style ={styles.rectanglePressable1}> 
                        <MainButton style = {0} title={restPressed ? 'Go Back' : 'Yes'} onPress={restPressed ? () => setRestPressed(false) : () => navigation.navigate("Post")}/>
                    </View>
                    </View> 
            </View>
     );
};

export default CheckInScreen;

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#F2F1F6',
        justifyContent: "center",
        alignSelf: "center",
        flex: 1

    },
    rectangleView: {
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 100,
        elevation: 12,
        shadowOpacity: 0,
        width: 300,
        height: 115,
        justifyContent: "center",
        alignContent: "center",

      },
    startAnActivity:{
        textAlign: "center",
        top: -22,
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        color: "#000",
      
      
    },
    rectanglePressable: {
        position: "absolute",
        top: 62,
        left: 20
    },
    rectanglePressable1: {
        position: "absolute",
        top: 62,
        right: 20
    }


})