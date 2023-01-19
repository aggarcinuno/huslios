import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartupScreen from '../screens/auth/StartupScreen';
import { BottomNavigator } from './bottomtab/BottomTabNavigator';
import { PostNavigator } from './post/PostStackNavigation';
import { AuthNavigator } from './auth/AuthStackNavigator';
import {auth} from '../firebase';

const AppStack = createStackNavigator();

const PrimaryNavigation = ({navigation}) => {
  
  return (
      <AppStack.Navigator  screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Startup" component={StartupScreen}/> 
        <AppStack.Screen name="Main" component={BottomNavigator}/>
        <AppStack.Screen name="Post" component={PostNavigator}/>
      </AppStack.Navigator>
  );
}

export default PrimaryNavigation;