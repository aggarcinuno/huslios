import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated, Alert, Button } from 'react-native';

import { sharedLocalState } from '../../states/LocalState';
import BackButton from '../../components/BackButton';
import PauseButton from '../../components/PauseButton';
import { useBetween } from 'use-between';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';


const TimerScreen = ({navigation: {goBack}, navigation}) => {

    const {img, setImg} = useBetween(sharedLocalState);
    const {elapsedTime, setElapsedTime} = useBetween(sharedLocalState);

    const [localElapsedTime, setLocalElapsedTime] = useState(0);
    const [isStopwatchStart, setIsStopwatchStart] = useState(true);
    const [resetStopwatch, setResetStopwatch] = useState(false);
    const [pauseDisabled, setPauseDisabled] = useState(false);
    const [othersDisabled, setOthersDisabled] = useState(true);
    const [finishDisabled, setFinishDisabled] = useState(true);
    
/*<Stopwatch
start={isStopwatchStart}
reset={resetStopwatch}
options={options}
getTime={(time) => {
    isStopwatchStart == false ? setTime(time) : null
}}/>
*/

    const pauseFadeAnim = useRef(new Animated.Value(1)).current;
    const othersFadeAnim = useRef(new Animated.Value(0)).current;
    const resumeAnim = useRef(new Animated.Value(0)).current;
    const finishAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(isStopwatchStart) {
            const interval = setInterval(() => updateTime(), 1000);
            return () => clearInterval(interval)
        }
        
    }, [isStopwatchStart])

    const updateTime = () => {
        setLocalElapsedTime((prevTime) => prevTime + 1)
    }

    const pauseFadeOut = () => {
        setIsStopwatchStart(!isStopwatchStart);
        setPauseDisabled(!pauseDisabled);
        Animated.parallel([
            Animated.timing(othersFadeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(resumeAnim, {
                toValue: -50,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(finishAnim, {
                toValue: 50,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(pauseFadeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
        
        setResetStopwatch(false);
        setElapsedTime(localElapsedTime);
        setOthersDisabled(!othersDisabled);
        (img != null) ? setFinishDisabled(!finishDisabled) : null;
    };

    const othersFadeOut = () => {
        setIsStopwatchStart(!isStopwatchStart);
        setOthersDisabled(!othersDisabled);
        Animated.parallel([
            Animated.timing(pauseFadeAnim, {
                toValue: 1,
                duration: 140,
                useNativeDriver:true
            }),
            Animated.timing(resumeAnim, {
                toValue: 0,
                duration: 140,
                useNativeDriver: true
            }),
            Animated.timing(finishAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(othersFadeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
        
        setResetStopwatch(false);
        setPauseDisabled(!pauseDisabled);
    };

    return (
        <SafeAreaView style={{flex:1}}>
            
            
            
            
            <View style={styles.container}>
                
            <TouchableOpacity title={'ok'} onPress={() => goBack()} style={{position: 'absolute', top: 28, left: 30}}>
                <Ionicons name={'arrow-back-outline'} size={28} color={'black'} />
            </TouchableOpacity>  
                
                
                <View style={styles.sectionStyle}>
                    <View>
                        <Text style={styles.timerText}>{`${moment.utc(localElapsedTime*1000).format('HH:mm:ss')}`}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                          
                        <Animated.View style={[
                            styles.resetButton,
                            {
                                opacity: othersFadeAnim,
                                transform: [{translateX: resumeAnim}]
                            }
                        ]}>
                            <View  style={styles.resetButton}>
                                <PauseButton style={1} disabled={othersDisabled} title={'Resume'}
                                    onPress={
                                        othersFadeOut    
                                        //setIsStopwatchStart(!isStopwatchStart);
                                        //setResetStopwatch(true);
                                    }
                                >
                                </PauseButton>
                            </View>
                        </Animated.View>

                        <Animated.View style={[
                            styles.nextButton,
                            {
                                opacity: othersFadeAnim,
                                transform: [{translateX: finishAnim}]
                            }
                        ]}>
                                <View  style={styles.nextButton}>
                                <PauseButton disabled={othersDisabled} title={"Finish"} style={(img != null) ? 3 : 2 } onPress={() => (img != null) ? navigation.navigate('ActivityCaption') : Alert.alert('Must upload a picture first!')}>
                                </PauseButton>
                            </View>
                        </Animated.View>

                        <Animated.View style={[
                            styles.startButton,
                            {
                                opacity: pauseFadeAnim
                            }
                        ]}>
                            <View  style={styles.startButton}>
                                <PauseButton disabled={pauseDisabled} title={''}
                                    onPress={pauseFadeOut} style={0}
                                >
                                    
                                </PauseButton>
                            </View>
                        </Animated.View> 

                    </View>
                </View>     
            </View>
        </SafeAreaView>
    );
}

export default TimerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionStyle: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        fontSize: 85,
        color: '#000',
        fontFamily: 'Lato-Bold'
    },
    buttonContainer: {
        top: 250,
        width: 249,
        height: 73
    },
    startButton: {
       alignSelf: "center",
       position:"absolute"
        
    },
    resetButton: {
        alignSelf: "center",
        position: "absolute"    

    },
    nextButton: {
        alignSelf: "center",
        position: "absolute"
    
    }


});

