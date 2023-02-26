// React Imports
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// AWS Imports
import { Auth } from 'aws-amplify';

export const Login = (email, password, navigation) => {
  return async (dispatch) => {
    try {
      const response = await Auth.signIn(email, password);
      await SecureStore.setItemAsync('sessionToken', response.signInUserSession.idToken.jwtToken);
      dispatch({
        type: 'LOGIN',
        user: {
          email: email,
          password: password,
          authToken: response.signInUserSession.idToken.jwtToken,
        }
      });
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        navigation.navigate('ConfirmEmail', { email });
      } else {
        Alert.alert('Incorrect Email/Password');
        dispatch({
          type: 'LOGIN',
          user: {
            email: '',
            password: '',
            authToken: null,
          }
        });
      }
    }
  };
};

export const Logout = () => {
  return async (dispatch) => {
    try {
      await Auth.signOut();
      await SecureStore.deleteItemAsync('sessionToken');
      dispatch({
        type: 'LOGOUT',
        user: {
          email: '',
          password: '',
          authToken: null,
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
};

