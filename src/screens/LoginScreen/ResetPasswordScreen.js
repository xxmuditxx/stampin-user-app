import { View, Text, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import React,  { useState, useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import { Auth } from 'aws-amplify'



const ResetPasswordScreen = ({ navigation }) => {
    // --------- User Inputs ---------
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // --------- Routed Data ---------
    const route = useRoute();
    const email = route?.params?.email;

    // --------- AWS Reset Password ---------
    const resetPassword = async () => {
        if (password == confirmPassword) {
            try {
                const response = await Auth.forgotPasswordSubmit(email, code, password)
                navigation.navigate('Login');
            } catch (e) {
                console.log(e);
            }
        } else{
            Alert.alert('Passwords do not match');
        }
    }
    
    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.container}
            >
            <Text h3 style={styles.heading}>
                Verify Email
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Confirmation Code'
                    autoFocus
                    keyboardType={'numeric'}
                    value={code}
                    onChangeText={(text) => setCode(text)}
                />
                <Input 
                    placeholder='Password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input 
                    placeholder='Confirm Password'
                    type='password'
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>
            <Button 
                onPress={resetPassword}
                title='Reset Password'
                containerStyle = {styles.button}
            />
        </KeyboardAvoidingView>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'top',
      padding:10,
      paddingTop: 100
    },
    heading: {
      marginBottom:50,
      fontSize: 25
    },
    inputContainer: {
      width: 300,
    },
    button: {
      width: 200,
      marginTop: 10
    },
  })