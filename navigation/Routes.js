import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PrimaryNavigation from './PrimaryNavigation';
import { PostNavigator } from './post/PostStackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import { AuthContext } from '../states/AuthContext';
import { AuthNavigator } from './auth/AuthStackNavigator';
import moment from 'moment';

const Routes = () => {


  useEffect(() => {
    currentDate = Number(moment().format('YYYYMMDD'))
    AsyncStorage.getItem('lastDate').then((value) => {
        if (currentDate > Number(value)) {
            AsyncStorage.setItem('hasPosted', 'false');
        }
    })
  }, []);

    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if(initializing) return null;

    return(
        <NavigationContainer>
            { user ? <PrimaryNavigation/> : <AuthNavigator/>}
        </NavigationContainer>
    );
};

export default Routes;