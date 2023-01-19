import React, {useContext, useRef, useState} from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, Animated,TouchableOpacity, Alert } from 'react-native';
import MainButton from '../../components/MainButton';
import { AuthContext } from '../../states/AuthContext';
import { sharedLocalState } from '../../states/LocalState';
import ImagePicker from 'react-native-image-crop-picker';
import BackButton from '../../components/BackButton';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'


const background = require('../../assets/background.png');
const logo = require('../../assets/logo.png');
const addprofilepicture = require('../../assets/subtract.png');


const Register = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState('');
    const {register, login} = useContext(AuthContext);

    //animation
    const [signUpCounter, setSignUpCounter] = useState(0);
    const [signInCounter, setSignInCounter] = useState(0);
    const logoAnim = useRef(new Animated.Value(0)).current;
    const logoOpac = useRef(new Animated.Value(1)).current;
    const inputAnim = useRef(new Animated.Value(0)).current;
    const backOpac = useRef(new Animated.Value(0)).current;
    const signUpAnim = useRef(new Animated.Value(1)).current;
    const signInAnim = useRef(new Animated.Value(1)).current;

    //sign up button
    const signUpButton = () => {
        if (signUpCounter == 1) {
            uploadProfilePicture
        }
       
        Animated.timing(logoAnim, {
            toValue: -280,
            duration: 150,
            useNativeDriver: true
        }).start();
        Animated.timing(inputAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
        }).start(); 
        Animated.timing(logoOpac, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start(); 
        Animated.timing(backOpac, {
            toValue: 1, 
            duration: 200,
            useNativeDriver: true
        }).start();
        Animated.timing(signInAnim, {
            toValue: 0, 
            duration: 150,
            useNativeDriver: true
        }).start();
        setSignUpCounter(1);
    }

    //sign in button
    const signInButton = () => {
        Animated.timing(logoAnim, {
            toValue: -220,
            duration: 140,
            useNativeDriver: true
        }).start();
        Animated.timing(inputAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
        }).start(); 
        Animated.timing(logoOpac, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start(); 
        Animated.timing(backOpac, {
            toValue: 1, 
            duration: 200,
            useNativeDriver: true
        }).start();
        Animated.timing(signUpAnim, {
            toValue: 0, 
            duration: 150,
            useNativeDriver: true
        }).start();
        setSignInCounter(1);
    }

    const backButton = () => {
        if (signUpCounter == 1 || signInCounter == 1) {
            Animated.timing(logoAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }).start();
            Animated.timing(inputAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start(); 
            Animated.timing(logoOpac, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }).start(); 
        }
        setTimeout(() => {
            setSignUpCounter(0);
        }, 200);
        setTimeout(() => {
            setSignInCounter(0);
        }, 200);
    }


    const meetsLoginFunc = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (username.length < 1 && password.length < 4) {
            return false;
        }
        if (!emailRegex.test(email.toLowerCase())){
            return false;
        }
        return true;
    }

    const meetsRegisterFunc = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (username.length < 1 && password.length < 4) {
            return false;
        }
        if (!emailRegex.test(email.toLowerCase())){
            return false;
        }
        return true;
    }

    // choose profile picture, called when user uploads to local state
    const chooseProfilePicture = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {setProfilePicture(image.path)})
    }

    // uploads profile picture when user confirms registration 
    const uploadProfilePicture = async () => {
        if (profilePicture != null) {
            await register(email, password);
            let currentUser;
            auth().onAuthStateChanged(user => {
                if(user) currentUser = user.uid;
            })
            const storageRef = storage().ref(`profilepictures/${profilePicture}`);
            const task = storageRef.putFile(profilePicture);
            try {
                await task;
                const url = await storageRef.getDownloadURL();
                firestore()
                .collection(`users`).doc(`${currentUser}`).set({
                    username: username,
                    profPic: url
                }).then(() => {
                    console.log('Post Added!');
                }).catch((error) => {
                    console.log('Something went wrong with added post to firebase', error);
                });
      
            } catch (e) {
                console.log(e); 
            }
        }
    }

        return (
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.container}>
                    <Animated.View style={{top: -40, opacity: inputAnim}}> 
                        {(signUpCounter == 1) ? <Text style={styles.signUp}>Sign Up</Text> : <Text style={styles.signUp}>Sign In</Text>} 
                        <BackButton color={'white'} onPress={backButton} />
                        
                    {/* profile picture stuff */}
                    {(signUpCounter == 1) ? <TouchableOpacity onPress={chooseProfilePicture} title={''} style={styles.profilePicture}>
                            <ImageBackground source={(profilePicture != null) ? {uri: profilePicture} : addprofilepicture} style={styles.profilePicture}></ImageBackground>
                        </TouchableOpacity> : null}
                    </Animated.View>
                    {/* husl logo animation */}
                    <Animated.Image source={logo} style={[styles.logo,
                    {opacity: logoOpac, transform: [{translateY: logoAnim}]}]}/>
                    
                    
                    {/* sign up form animation stuff */}
                    {(signUpCounter == 1) ? <Animated.View style={[styles.form, {opacity: inputAnim}]}>
                        {/* name input stuff */}
                        <Animated.View>
                            <Text style={styles.inputTitle}>Username</Text>
                            <TextInput style={styles.input} autoCapitalize="none" 
                            onChangeText={text => setUsername(text)} value={username.value}/>
                        </Animated.View>
                        {/* email input stuff */}
                        <Animated.View style={{marginTop: 32}}>
                            <Text style={styles.inputTitle}>Email Address</Text> 
                            <TextInput style={styles.input} autoCapitalize="none" 
                            onChangeText={text => setEmail(text)} value={email.value}/>
                        </Animated.View>
                        {/* password input stuff */}
                        <Animated.View style={{marginBottom: 50,marginTop: 32}}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput style={styles.input} autoCapitalize="none"
                            onChangeText={text => setPassword(text)} value={password.value}/>
                        </Animated.View>
                    </Animated.View> : null}

                    {/* sign in form animation stuff */}
                    {(signInCounter == 1) ? <Animated.View style={[styles.form, {opacity: inputAnim}]}>
                        {/* email input stuff */}
                        <Animated.View style={{marginTop: 32}}>
                            <Text style={styles.inputTitle}>Email Address</Text> 
                            <TextInput style={styles.input} autoCapitalize="none" 
                            onChangeText={text => setEmail(text)} value={email.value}/>
                        </Animated.View>
                        {/* password input stuff */}
                        <Animated.View style={{marginBottom: 50,marginTop: 32}}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput style={styles.input} autoCapitalize="none"
                            onChangeText={text => setPassword(text)} value={password.value}/>
                        </Animated.View>
                    </Animated.View> : null}

                    {/* static register & login buttons */}   
                    <View style={styles.rectangleView}>
                        <View style={{top: 70, position: 'absolute'}}>
                            {(signUpCounter == 0 && signInCounter != 1) ? <MainButton style={1} title='Sign Up' onPress={(signUpButton)}/> : 
                            (signUpCounter == 1) ? <MainButton style={1} title='Sign Up' onPress={meetsRegisterFunc() ? () => uploadProfilePicture() : () => Alert.alert('Invalid Credentials')}/> : null}
                        </View>
                        <View style={{marginTop: 40, position: 'absolute', top: 70}}>
                            {(signInCounter == 0 && signUpCounter != 1) ? <MainButton style={2} title='Sign In' onPress={(signInButton)}/> : 
                            (signInCounter == 1 ) ? <MainButton style={2} title='Sign In' onPress={meetsLoginFunc() ? () => login(email, password) : () => Alert.alert('Invalid Credentials')}/> : null}     
                        </View>
                    </View>
                </ImageBackground>
            </View>           
        );
};

export default Register;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    profilePicture: {
        marginBottom: 20,
        overflow: 'hidden', 
        width: 128, 
        height: 128, 
        borderRadius: 100, 
        alignSelf: 'center'
    },
    signUp: {
       fontSize: 24,
       fontFamily: 'Lato-Bold',
       color: "#fff",
       alignSelf: 'center', 
       marginBottom: 20
    },
    greeting: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        color: "#FD5627"
      
    },
    errorMessage: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        fontFamily: 'Lato-Bold',
    },
    logo: {
        position: 'absolute',
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    error: {
        color: "#000",
        fontsize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 20,
        top: -30
    },
    inputTitle: {
        color: "#fff",
        fontSize: 10,
        textTransform: "uppercase",
        marginTop: 0,
        opacity: 1,
    },
    input: {
        borderBottomColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#fff",
        opacity: 1,     
    },
    rectangleView: {
        alignSelf: 'center',
        width: 300,
        height: 115,
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        bottom: 150
      }
})