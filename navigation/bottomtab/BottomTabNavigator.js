import React from "react";
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CheckInScreen from "../../screens/post/CheckInScreen";
import ProfileScreen from "../../screens/user/profile/ProfileScreen";
import FeedScreen from "../../screens/user/feed/FeedScreen";
import { PostNavigator } from "../post/PostStackNavigation";
import { FeedNavigator } from "../post/FeedStackNavigator";

const BottomTabNavigator = createMaterialTopTabNavigator();

export const BottomNavigator = () => {
    return (
        <View style= {styles.container}>
          <BottomTabNavigator.Navigator

          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused
            ? 'home'
            : 'home-outline';
          } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
          }
          size = 26
          return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          
          tabBarInactiveTintColor: 'gray',

          tabBarStyle: styles.tabNavigator,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {backgroundColor: null},
          tabBarIconStyle: styles.iconStyle
        })}>
          <BottomTabNavigator.Screen name="Feed" component={FeedNavigator}/>
          <BottomTabNavigator.Screen name="Profile" component={ProfileScreen} />
          
        </BottomTabNavigator.Navigator>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
  },
  tabNavigator: {
      elevation: 0,
      position: 'absolute',
      left: 120,
      right: 120,
      bottom: 40,
      height: 44,
      borderRadius: 100,
      backgroundColor: "#fff",
      opacity: .95,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      alignContent: 'center',
      justifyContent: 'center'
  },
  tabLabel: {
      top: 0,
      height: 2,
      width: 0,
      alignSelf: 'center'
  },
  iconStyle: {
      bottom: 6,
      height: 30,
      width: 30,
      alignSelf: 'center',
      justifyContent: 'center'
  }
})