import React, { useEffect } from 'react';
import { Image,ImageBackground, View, StyleSheet } from 'react-native';
import { FeedNavigator } from '../../navigation/post/FeedStackNavigator';
import { sharedLocalState } from '../../states/LocalState';

const background = require('../../assets/background.png')
const logo = require('../../assets/logo.png')


const StartupScreenCopy = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={background} style={styles.background}>
                <Image source={logo} style={styles.logo}></Image>
            </ImageBackground> 
            </View>
     );
};


export default StartupScreenCopy;

    
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#000',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            },
            background: {
                width: '100%',
                height: '100%',
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            },
            logo: {
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center",
            }

        });