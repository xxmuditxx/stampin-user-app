// Importing react modules
import { Header } from '@react-navigation/elements'
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { Button, Input } from "react-native-elements";
import { useRoute } from '@react-navigation/native'

// Expo Imports
import * as SecureStore from 'expo-secure-store';

// AWS Imports
import { Auth } from 'aws-amplify';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { Login } from '../../store/actions';

const LoginScreen = ({ navigation }) => { 
    // Redux variables
    const dispatch = useDispatch();

    // --------- User Inputs ---------
    var [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // --------- Routed Data ---------
    const route = useRoute();
    if (route?.params?.email != undefined) {
        email = route?.params?.email
    }

    // --------- Sign In Function ---------
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        setLoading(true);
        dispatch(Login(email, password, navigation)).then(() => {
            setLoading(false)
        });
    }

    // --------- Assets Declaration ---------
    const logo = require('../../assets/logo-no-background.png');

    return (
        <View style={styles.background}>
            {loading ? (<>
                        <Image source={logo}
                               style={{ width: 200, height: 200 }} />
                        <ActivityIndicator size="large" color="#0000ff" /> 
                        </>) : (<>
                        <Image source={logo}
                               style={{ width: 200, height: 200 }} />
                        <KeyboardAvoidingView behavior='padding'
                                              style={styles.container}>
                            <StatusBar style="dark" />
                            <View style={styles.inputContainer}>
                                <View style={{ height: 300 }} />
                                <Input
                                    placeholder="Email"
                                    autoFocus
                                    type='email'
                                    value={email}
                                    onChangeText={(text) => setEmail(text)} />
                                <Input
                                    placeholder="Password"
                                    secureTextEntry
                                    type='password'
                                    value={password}
                                    onChangeText={(text) => setPassword(text)} />
                            </View>

                            <Button
                                containerStyle={styles.button}
                                onPress={signIn}
                                title="Login" />
                            <Button 
                                onPress={() => navigation.navigate('SignUp')}
                                containerStyle={styles.button}
                                type="clear"
                                title="Sign Up" />
                            <Button
                                onPress={() => navigation.navigate('ForgotPassword')}
                                containerStyle={styles.button}
                                type="clear"
                                title="Forgot Password?" />
                            <View style={{ height: 120 }} />
                        </KeyboardAvoidingView>
                </>)
            }
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
    },
    inputContainer: {
        width: 300,

    },
    button:{
        width: 200,
        marginTop: 10
    }
})