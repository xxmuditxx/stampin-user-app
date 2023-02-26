import { View, Text, KeyboardAvoidingView, StyleSheet, Image, Alert } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements'

// AWS Imports
import { Auth } from 'aws-amplify';

const SignUpScreen = ({navigation}) => {
  // --------- User Inputs ---------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --------- Sign In Function ---------
  const signUp = async () => {

    try{
      const response = await Auth.signUp({
        username: email,
        password: password,
        attributes: {name: name}
      });
      navigation.navigate('ConfirmEmail', {email});
    } catch (e) {
      if (e.code == 'UsernameExistsException') {
        Alert.alert('An account with this email already exists.');
        navigation.navigate('Login');
      } else if (e.code == 'InvalidPasswordException') {
        Alert.alert(e.message);
      }
      console.log(e);
    }
  }

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
          placeholder='Name'
          autoFocus
          type='text'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input 
          placeholder='Email'
          type='text'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input 
          placeholder='Password'
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button 
        onPress={signUp}
        title='SignUp'
        containerStyle = {styles.button}
      />
  </KeyboardAvoidingView>
  )
}

export default SignUpScreen

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