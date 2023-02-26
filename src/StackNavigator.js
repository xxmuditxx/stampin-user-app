import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// AWS Imports
import { Auth } from 'aws-amplify';

// Expo Imports
import * as SecureStore from 'expo-secure-store';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';

// Importing Login screens
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/LoginScreen/SignUpScreen';
import ConfirmEmailScreen from './screens/LoginScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from './screens/LoginScreen/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/LoginScreen/ResetPasswordScreen';

// Importin main screens
import HomeScreen from './screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  // Redux variables
  const dispatch = useDispatch();

  // ----- Login from pre-existing token on user device -----
  // useLayoutEffect(() => {
  //   (async () => {
  //     const sessionToken = await SecureStore.getItemAsync('sessionToken');
  //     if (sessionToken) {
  //       // Log the user in automatically
  //       console.log('working')
  //       dispatch({
  //         type: 'LOGIN',
  //         user: {
  //           authToken: sessionToken
  //         }
  //       });
  //     } else {
  //       console.log('User not signed in.')
  //     }
  //   })();
  // }, []);

  const userToken = useSelector(state => state.authReducer.user.authToken);
  console.log(userToken)
  
  // initialRouteName={userToken ? 'Home' : 'Login'}>
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}> 
          {userToken ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            </>
          )}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator;

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding:10,
  }
})