import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native"; 

import { BottomNavigator } from "../bottomtab/BottomTabNavigator";

import TimerScreen from "../../screens/post/TimerScreen";
import CameraScreen from "../../screens/post/CameraScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


const TimerTabNavigator = createMaterialTopTabNavigator();

export const TimerNavigator = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <TimerTabNavigator.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarIndicatorStyle: {
                backgroundColor: '#FB581D',
                borderRadius: 100,
                height: 5
            },
            tabBarIndicatorContainerStyle: {
                backgroundColor: null,
                borderRadius: 100,
                alignContent: 'center',
                justifyContent: 'center'
            },
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: '#F5DFDA',
                shadowColor: null,
                left: 80,
                right: 80,
                top: 88,
                height: 60,
                borderRadius: 100,
                height: 5
            }

        }}>
            <TimerTabNavigator.Screen 
            name="Timer"
            component={TimerScreen}
            />
            <TimerTabNavigator.Screen 
            name="Camera"
            component={CameraScreen}
            />
        </TimerTabNavigator.Navigator>
        </View>
    );
};