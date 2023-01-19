import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert} from 'react-native';
import MainButton from '../../components/MainButton';
import ImagePicker from 'react-native-image-crop-picker';

import { sharedLocalState } from '../../states/LocalState';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';






const CameraScreen = ({navigation}) => {

    useEffect(() => {

        cameraStuff()
    }, [])

    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    const camera = useRef(null)
   
   // const camera = useRef<Camera>(null)
    //const device = devices.back
   // const camera = useRef<Camera>(null)
    
   
 

    const cameraStuff = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus()
        console.log(cameraPermission)
        const microphonePermission = await Camera.getMicrophonePermissionStatus()
        console.log(microphonePermission)
        const devices = await Camera.getAvailableCameraDevices()
        console.log(devices)
        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()
        
    }


    const {setImg} = sharedLocalState();

    const choosePicture = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {setImg(image.path);
        });
    };

    const takePhoto = async () => {
        const photo = camera.current?.takePhoto().then(image => {setImg(image.path)})
       
    }

  

    
    if (device == null) return <View><Text>Hi</Text></View>
    
  
    return (
        <View style={{flex:1}}>
            <Text>ok</Text>
            <Camera photo={true} ref={camera} isActive={true} style={StyleSheet.absoluteFill} device={device}/>

            <View>
            <TouchableOpacity style={{height: 74, width: 74, backgroundColor: 'white', borderRadius: 100, marginTop: 720, alignSelf: 'center'}} onPress={() => takePhoto()}/>
            </View>
        </View>
        
     );
};

export default CameraScreen;


/*
<View style={{  justifyContent: 'center', alignItems: 'center', flex: 1}}>

        
            <View >
                <MainButton style = {0} title={'Upload'} onPress={choosePicture}></MainButton>
            </View>
            <View style={{marginTop: 32}}>
                <MainButton style = {0} title={'Confirm'} onPress={() => navigation.navigate('Timer')}></MainButton>
            </View>
            <View style={{marginTop: 32}}>
                <MainButton style = {0} title={'Delete'} onPress={() => setImg(null)}></MainButton>
            </View>
        </View>
        */