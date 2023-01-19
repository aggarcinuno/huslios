import React from "react";
import { View,SafeAreaView } from "react-native"; 

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectActivityScreen from "../../screens/post/SelectActivityScreen";
import CaptionScreen from "../../screens/post/CaptionScreen";

const ActivityTabNavigator = createMaterialTopTabNavigator();

export const ActivityNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityTabNavigator.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarIndicatorStyle: {
                backgroundColor: '#FB6420',
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
                top: 40,
                height: 60,
                borderRadius: 100,
                height: 5
            }

        }}>
            <ActivityTabNavigator.Screen 
            name="Activity"
            component={SelectActivityScreen}
            />
            <ActivityTabNavigator.Screen 
            name="Caption"
            component={CaptionScreen}
            />
        </ActivityTabNavigator.Navigator>
        </SafeAreaView>
    );
};