import moment from 'moment';
import React, { useContext, useState } from 'react';
import { AuthContext } from "../states/AuthContext";
import { sharedLocalState } from '../states/LocalState';


const submitPost = async (caption) => {

    const {user} = useContext(AuthContext)
    const {userData, elapsedTime, postArray} = sharedLocalState();
    const {img, setImg} = sharedLocalState();

    let currentWeek = moment().startOf('week')
    currentWeek = currentWeek.format('YYYYMMDD')

    let currentDay = Number(moment().format('YYYYMMDD'))

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
        caption: 'caption',
        postTime: firestore.Timestamp.fromDate(new Date())
    })
    .then(() => {
        AsyncStorage.setItem('hasPosted', 'true')
        AsyncStorage.setItem('lastDate', `${currentDay}`)
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

export {submitPost}