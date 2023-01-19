import { createStackNavigator } from "@react-navigation/stack";
import React from "react";



import CaptionScreen from "../../screens/post/CaptionScreen";
import { TimerNavigator } from "./TimerTabNavigation";
import { ActivityNavigator } from "./ActivityTabNavigation";



const PostStackNavigator = createStackNavigator();

export const PostNavigator = () => {
    return (
        <PostStackNavigator.Navigator screenOptions={{headerShown:false}}>
            <PostStackNavigator.Screen 
            name="TimerCamera"
            component={TimerNavigator}
            />
            <PostStackNavigator.Screen 
            name="ActivityCaption"
            component={ActivityNavigator}
            />
             
        </PostStackNavigator.Navigator>
    );
};