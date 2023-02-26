import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React,  { useState, useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

const ForgotPasswordScreen = ( { navigation } ) => {
    // --------- User Inputs ---------
    const [email, setEmail] = useState('');

    // --------- AWS Forgot Password ---------
    const getCode = async () => {
        try {
            const response = await Auth.forgotPassword(email);
            navigation.navigate('ResetPassword', {email});
        } catch(e) {
            console.log(e);
        }
    };

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
                        placeholder='Email'
                        type='text'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <Button 
                    onPress={getCode}
                    title='Get Code'
                    containerStyle = {styles.button}
                />
            </KeyboardAvoidingView>
    )
}

export default ForgotPasswordScreen

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