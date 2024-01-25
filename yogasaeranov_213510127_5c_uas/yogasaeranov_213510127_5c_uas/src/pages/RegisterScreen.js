// RegisterScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [npm, setNPM] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!nama || !email || !npm || !password) {
      Alert.alert('Error', 'Mohon isi semua data terlebih dahulu !!');
      console.log('Mohon isi semua data terlebih dahulu !!');
      return;
    }
    const userData = {
      nama: nama,
      email: email,
      npm: npm,
      password: password,
    };
    axios
      .post('http://localhost:5001/register', userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'ok') {
          Alert.alert('Registrasi Berhasil', res.data.data);
          console.log('Registrasi Berhasil !!');
          navigation.navigate('Login');
        } else {
          Alert.alert('Registrasi Gagal', res.data.data);
          console.log('Registrasi Gagal !!');
        }
      })
      .catch((e) => console.log(e));
  };

  const goLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={nama}
        onChangeText={(text) => setNama(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="NPM"
        value={npm}
        onChangeText={(text) => setNPM(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goLogin}>
          <Text style={styles.buttonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 25,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default RegisterScreen;
