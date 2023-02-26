import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React,  { useState, useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

const ConfirmEmailScreen = ({ navigation }) => {
    // --------- User Inputs ---------
    var [code, setCode] = useState(undefined);

    // --------- Routed Data ---------
    const route = useRoute();
    var email = route?.params?.email;

    // --------- AWS Email confirmation ---------
    const confirmEmail = async () => {
        try{
            const response = await Auth.confirmSignUp(email, code)
            navigation.navigate('Login', {email})
        } catch(e) {
            console.log(e.message);
        }
    }

    // --------- AWS Resend Code ---------
    const resendCode = async () => {
        try{
            const response = await Auth.resendSignUp(email)
            code = '';
        } catch(e) {
            console.log(e.message);
        }
    };

    return (
        <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
        >
            <Text h3 style={styles.heading}>
                Start using StampIn
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder='Confirmation Code'
                    autoFocus
                    keyboardType={'numeric'}
                    value={code}
                    onChangeText={(text) => setCode(text)}
                />
            </View>
            <Button 
                onPress={confirmEmail}
                title='Confirm Email'
                containerStyle = {styles.button}
            />
            <Button 
                onPress={resendCode}
                title='Resend Code'
                containerStyle = {styles.button}
            />
        </KeyboardAvoidingView>
  )
}

export default ConfirmEmailScreen

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