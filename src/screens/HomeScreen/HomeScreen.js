import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Auth } from 'aws-amplify';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../store/actions';

const HomeScreen = ({ navigation }) => {
  // Redux variables
  const dispatch = useDispatch();

  // Logout action call
  const logout = async () => {
    dispatch(Logout());
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to your Homepage</Text>
      <Button
        title="Logout"
        onPress={logout}
        buttonStyle={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 20
  },
  logoutButton: {
    marginTop: 20
  }
});

export default HomeScreen;
