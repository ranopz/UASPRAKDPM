// ProfileScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState('');

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await axios.post('http://localhost:5001/userdata', {
        token: token,
      });
      console.log(response.data);
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const goEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={userData && userData.nama}
          editable={true}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userData && userData.email}
          editable={false}
        />

        <Text style={styles.label}>NPM:</Text>
        <TextInput
          style={styles.input}
          value={userData && userData.npm}
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.editButton} onPress={goEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1', // Background color for the entire screen
  },  
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#2c3e50', // Dark gray color for labels
  },
  input: {
    height: 40,
    borderColor: '#bdc3c7', // Light gray border color for inputs
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white', // White background for inputs
    borderRadius: 5,
    textAlign: 'center',

  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
