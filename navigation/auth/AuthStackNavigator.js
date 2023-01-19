import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Register from "../../screens/auth/Register";
import { PostNavigator } from "../post/PostStackNavigation";

const AuthStackNavigator = createStackNavigator();

import {auth } from '../../firebase';
import { BottomNavigator } from "../bottomtab/BottomTabNavigator";


export const AuthNavigator = () => {

    return (
        <AuthStackNavigator.Navigator screenOptions={{headerShown:false}}>
            <AuthStackNavigator.Screen 
            name="Register"
            component={Register}
            />
            <AuthStackNavigator.Screen 
            name="App"
            component={BottomNavigator}
            />
        </AuthStackNavigator.Navigator>
    );
};