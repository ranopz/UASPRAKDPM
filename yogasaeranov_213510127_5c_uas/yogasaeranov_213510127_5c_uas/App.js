// App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTabs from './src/component/CustomBottomTabs';
import RegisterScreen from './src/pages/RegisterScreen';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import EditProfileScreen from './src/pages/EditProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CustomBottomTabs">
        <Stack.Screen
          name="CustomBottomTabs"
          component={CustomBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false, title: 'Edit Profile' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
