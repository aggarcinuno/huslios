import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, SafeAreaView } from 'react-native';
import { AuthContext } from '../../../states/AuthContext';
import { sharedLocalState } from '../../../states/LocalState';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { RefreshControl } from 'react-native-gesture-handler';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars'


const ProfileScreen = ({navigation}) => {
    
    const {userData, setUserData} = sharedLocalState();
    const {userActivities, setUserActivities} = sharedLocalState();
    const [userDuration, setUserDuration] = useState([]);
    const [userDays, setUserDays] = useState([]); 
    const {user, logout} = useContext(AuthContext);


    const [calendarDay, setCalendarDay] = useState(null);

    const [loading, setLoading] = useState(true);

    let currentWeek = moment().startOf('week')
    currentWeek = currentWeek.format('YYYYMMDD')
    let currentWeekBetterFormatted = moment().startOf('week')
    currentWeekBetterFormatted = `Week of ${currentWeekBetterFormatted.format('MMM D')}`

    const chartConfig = {
        decimalPlaces: 0,
        backgroundColor: '#000',    
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
      
        color: (opacity = 1) => `rgba(252, 132, 3, ${opacity})`,
      };

    useEffect(() => {

       fillTheGaps();
       getUser();
       getActivities();  
       
       return   
    }, [])

    
   

    const getUser = async() => {
            await firestore().collection('users').doc(user.uid)
            .get().then((documentSnapshot) => {
            setUserData(documentSnapshot.data());
        })
    }

    // pull all activities
    // append current week to testdata
    // 


   


    const waitingforData = () => {
        sums = splitDurationDateIntoWeeks();
        sums = sums.map(array => array.reduce((a, b) => a + b, 0));
        return sums 
    }

    const splitDurationDateIntoWeeks = () => {
        let subArrays = [[]]
        for (let i = 0; i < userDuration.length; i+=7) {
            var subArray = userDuration.slice(i, i+7)
            subArrays.unshift(subArray)

        }
        for (let i = 0; i < 7; i++) {
            if (typeof subArrays[0][i] == 'undefined') {
                subArrays[0][i] = 0
            }
        }
        if (subArrays.length == 1) {
            return [[0,0,0,0,0,0,0]]
        }
        subArrays.pop()
        return subArrays
    }

/*
    const sumAllWeekDurations = () => {
        var aOA = splitDurationDateIntoWeeks()
        var sums = aOA.map(array => array.reduce((a,b) => a+b, 0));
        setDisplayAllWeekMinutes(sums)
    }
    */

    const fillTheGaps = async () => {   

        // DATES (IN MOMENT FORMAT FOR THE SAKE OF ADDING/SUBTRACTING)

        // get last date opened 
        let lastDate = await AsyncStorage.getItem('lastDate')
        const lastMomentDate = moment(lastDate);

        // get current date
        let todayDate = moment()
        
        // get one day before current date
        let dayBeforeToday = moment().subtract(1, 'd');

        // get one day after the last posted date   
        const lastMomentDateCopy = {lastMomentDate}        
        const lastMomentDateCopyString = lastMomentDateCopy.lastMomentDate
        const lastMomentDateCopyStringMoment = moment(lastMomentDateCopyString)
        const dayAfterLastPostedDate = lastMomentDateCopyStringMoment.add(1, 'd')

        // get beginning of current week
        let currentWeek = moment().startOf('week')

        // FORMATTED AS STRING
        let currentWeekFormatted = currentWeek.format('YYYYMMDD')
        let todayDateFormatted = moment().format('YYYYMMDD')


        
        // if the last posted date is today and the user activity data has an entry for the beginning of the week do nothing
        if ((lastMomentDate.format('YYYYMMDD') == todayDate.format('YYYYMMDD')) && userDays.includes(Number(currentWeekFormatted))) {
            return 
        }

        // if the last posted date is equal to today && a user has not data for the beginning of the current week 
        // Case: first time making account
        if ((lastMomentDate.format('YYYYMMDD') == todayDate.format('YYYYMMDD')) && !userDays.includes(Number(currentWeekFormatted))) {
            for (let i = currentWeek; i < dayBeforeToday; i.add(1, 'd')){
                console.log(i.format('YYYYMMDD'))
                await firestore()
                .collection(`users`).doc(`${user.uid}`).collection(`activities`).doc(`${i.format('YYYYMMDD')}`).set({
                    duration: 0,
                    day: Number(i.format('YYYYMMDD'))
                }).then(() => {
                    console.log('Activities Added!');
                }).catch((error) => {
                    console.log('Something went wrong with added post to firebase', error);
                });
            }
            return
        }

        // if the last posted date is not yesterday add rest day entries for all days between last posted date and 
        if ((lastMomentDate.format('YYYYMMDD') != dayBeforeToday.format('YYYYMMDD'))) {
            for (let i = dayAfterLastPostedDate; i < todayDate; i.add(1, 'd')){
                await firestore()
                .collection(`users`).doc(`${user.uid}`).collection(`activities`).doc(`${i.format('YYYYMMDD')}`).set({
                    duration: 0,
                    day: Number(i.format('YYYYMMDD'))
                }).then(() => {
                    console.log('Activities Added!');
                }).catch((error) => {
                    console.log('Something went wrong with added post to firebase', error);
                });
                if (i == dayBeforeToday) {
                    AsyncStorage.setItem('lastPosted', `${dayBeforeToday.format('YYYYMMDD')}`)
                }
            }
            return
        }

    }

    const getActivities = async() => {
        let currentWeek = moment().startOf('week')
        currentWeek = currentWeek.format('YYYYMMDD')
        const durationArray = [];
        const dateArray = [];
        await firestore().collection('users').doc(user.uid).collection('activities').orderBy("day", "asc")
            .get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    durationArray.push(data.duration)   
                    dateArray.push(data.day)
                })
                setUserDuration(durationArray)
                console.log(durationArray)
                setUserDays(dateArray)
                console.log(dateArray)
        })
        if (loading) {
            setLoading(false)
        }
    }



    const fillGapsAndGetActivities = async () => {
        await fillTheGaps();
        await getActivities();
        console.log(userDuration)
        console.log(onceMore[0])
        console.log(displayWeekMinutes)
    }
    

 


    const changeWeek = (direction) => {
        if (direction == 'left') {
            grabWeek = displayDate
            grabWeek = grabWeek.subtract(1, 'w')
            setDisplayDate(grabWeek)
            setDisplayWeek(`Week of ${grabWeek.format('MMM D')}`)
            setDisplayWeekMinutesPos(displayWeekMinutesPos+1)
            setDisplayWeekMinutes(onceMore[displayWeekMinutesPos])
            
           
        }
        if (direction == 'right') {
            grabWeek = displayDate
            grabWeek = grabWeek.add(1, 'w')
            setDisplayDate(grabWeek)
            setDisplayWeek(`Week of ${grabWeek.format('MMM D')}`)
            setDisplayWeekMinutesPos(displayWeekMinutesPos-1)
            setDisplayWeekMinutes(onceMore[displayWeekMinutesPos])
        }
    }



    
    const [weekOffset, setweekOffset] = useState(0);
    const [displayWeek, setDisplayWeek] = useState(`Week of ${moment().startOf('week').format('MMM D')}`)
    const [displayDate, setDisplayDate] = useState(moment().startOf('week'))
   
    const testData = splitDurationDateIntoWeeks();
    const onceMore = waitingforData();
    const [displayWeekMinutes, setDisplayWeekMinutes] = useState(onceMore[0])
    const [displayWeekMinutesPos, setDisplayWeekMinutesPos] = useState(0)

    //       
    return (
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex: 1}} refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => {fillGapsAndGetActivities()}}/>}
        >


            <View style={styles.main}>
                <View style={styles.userInfo}>
                    <Image style={styles.pP} source={{uri: userData ? userData.profPic : null}}/>
                    <Text style={styles.username}>{ userData ? userData.username : null}</Text>
                </View>

                <View style={styles.recapBox}>
                    <View>
                        <Text style={styles.boxText}>{displayWeek}</Text>
                        <Text style={styles.boxSubText}>{`${moment.utc(onceMore[displayWeekMinutesPos]*1000).format('HH:mm:ss')}`}</Text>
                    </View>
                    
                    <View style={{height: 210, width: 360, backgroundColor: '#fff'}}>
                        <ScrollView 
                            onMomentumScrollEnd={(e) => {
                                var currentOffset = e.nativeEvent.contentOffset.x;
                                if (currentOffset == weekOffset + 360) {
                                    changeWeek('left')
                                    setweekOffset(currentOffset)
                                } 
                                if (currentOffset == weekOffset - 360) {
                                    changeWeek('right')
                                    setweekOffset(currentOffset)
                                }
                            }}
                            style={{height: 220 , width: 360, backgroundColor: '#fff', transform: [{ scaleX: -1}]}}
                            showsHorizontalScrollIndicator={true}
                            horizontal
                            pagingEnabled={true}
                        >
                         
                            {
                                
                                testData.map((e, index) => 
                                
                                <LineChart
                                    key={e}
                                    data={{
                                        labels: ["S", "M", "T", "W", "T", "F", "S"],
                                        datasets: [
                                            {
                                                data: e
                                            }
                                        ]
                                    }}
                                    style={styles.graphStyle}
                                    width={380}
                                    height={190}
                                    chartConfig={chartConfig}
                                /> )
                                
                            }
                           
                        </ScrollView>
                    </View>
                   
                </View>

                <View style={styles.calendarBox} >
                
                    <View >
                    
                        <Calendar 
                        style={{height: 150, alignContent: 'center'}}
                        theme={{
                            textDayFontSize: 10,
                            textDayHeaderFontSize: 10,
                            textDayFontFamily: 'Lato-Bold',
                            textMonthFontFamily: 'Lato-Bold',
                            textDayHeaderFontFamily: 'Lato-Bold',
                            arrowColor: '#FC8E18'
                        }}
                        selected={false}
                        onDayPress={(day) => setCalendarDay(day.dateString)}
                        markedDates={{[calendarDay]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: "#FC8E18",
                            selectedTextColor: 'white'
                        }}}
                        />
                        
                    </View>
                    
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
     );
};


//
//     <Text style={styles.boxText}>All Time</Text>
//     <Text style={styles.boxSubText}>10 workouts</Text>

// <Button title={'logout'} color={'#B3D57B'} onPress={() => logout()}/>
export default ProfileScreen;

const styles = StyleSheet.create ({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F2F1F6'
    },
    userInfo: {
        top: 40,
        marginBottom: 40
    },
    pP: {
        width: 70,
        height: 70,
        borderRadius: 100,
        alignSelf: 'center',
        top: 0
    },
    username: {
        fontSize: 20,
        marginTop: 4,
        color: "black",
        alignSelf: 'center',
        fontFamily: 'Lato-Bold'
    },
    graphStyle:{
        marginTop: 8,
        marginLeft: -20,
        marginRight: -18,
        
        transform: [{ scaleX: -1}]
    },
    recapBox: {
        overflow: 'hidden',
        width: 360,
        height: 260,
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
        marginTop: 16,
    },
    calendarBox: {
        overflow: 'hidden',
        width: 360,
        height: 300,
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
        marginTop: 10,
        marginBottom:50
    },
    boxText: {
        marginLeft: 20,
        marginTop: 15,
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: '#000'
    },
    boxSubText: {
        marginLeft: 20,

        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: '#B9B9B9',
    }
})