import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import MainButton from '../../components/MainButton';
import { sharedLocalState } from '../../states/LocalState';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../states/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment, { duration } from 'moment';


const CaptionScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const {img, setImg, userData, elapsedTime} = sharedLocalState();
    const {didRest} = sharedLocalState();


    const [caption, setCaption] = useState('');
    console.log(caption);
    const {postArray, setHasPostedTracker} = sharedLocalState();

    let currentWeek = moment().startOf('week')
    currentWeek = currentWeek.format('YYYYMMDD')

    let currentDay = Number(moment().format('YYYYMMDD'))
   
    const submitPost = async () => {  
        const imageUrl = await uploadImage();
        await firestore()
                .collection(`users`).doc(`${user.uid}`).collection(`activities`).doc(`${currentDay}`).set({
                    day: currentDay,
                    activities: postArray,
                    duration: elapsedTime
                }).then(() => {
                    console.log('Activities Added!');
                }).catch((error) => {
                    console.log('Something went wrong with added post to firebase', error);
                });
        await firestore()
        .collection('posts')
        .add({  
            username: userData.username,
            userImg: userData.profPic,
            userId: user.uid,
            activities: postArray,
            postImg: imageUrl,
            caption: caption,
            postTime: firestore.Timestamp.fromDate(new Date())
        })
        .then(() => {
            AsyncStorage.setItem('hasPosted', 'true')
            AsyncStorage.setItem('lastDate', `${currentDay}`)

            setHasPostedTracker(true)
        })
        .catch((error) => {
            console.log('Something went wrong with added post to firebase', error);
        });
        navigation.navigate('FeedyFeedy')
        
    }

    const uploadImage = async () => {
        const uploadURI = img;
        let filename = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const storageRef = storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadURI);
        task.on('state_changed', (taskSnapshot) => {
            console.log(
                `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
        });
        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setImg(null);
            Alert.alert(
                'Image uploaded!',
                'Success '
            );
            return url;    
        } catch (e) {
            console.log(e); 
        }
        setImg(null);
    }
    
    return (
        <View style={styles.main}>
            <View style={styles.question}>
                <Text style={styles.question}>How'd it go?</Text>
            </View>
            <View style={styles.textBox}>
                <TextInput style={styles.textBoxText} placeholder='Enter a caption' onChangeText={(text) => setCaption(text)} value={caption}></TextInput>
            </View>
            <View style={styles.postButton}>
                <MainButton style = {0} title={'Post'} onPress={submitPost}></MainButton>
            </View>
        </View>
     );
};

export default CaptionScreen;

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
    textBoxText: {
        color: '#000'
    },
    textBox: {
        width: 346,
        height: 104,
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
    postButton: {
        marginTop: 300
    }
   
})


/* 


*/