import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput, Button} from 'react-native-paper';
import { API } from './API';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  const login = async () => {
    setIsLoading(true);
    fetch(`${API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token);
        } catch (err) {
          console.log('Error:', err);
        }
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.loginView}>
      <View style={styles.headView}>
        <Text style={styles.headText}>Welcome to WebI</Text>
        <Text style={styles.subHeadText}>login with existing account</Text>
      </View>
      <TextInput
        label="Username"
        mode="outlined"
        style={styles.textInput}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        icon="login"
        mode="contained"
        loading={isLoading}
        onPress={() => login()}
        labelStyle={styles.buttonLabel}
        style={styles.button}>
        Login
      </Button>
      <Text
        style={styles.alreadyText}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account ? Register here
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginView: {padding: 20},
  headView: {
    padding: 10,
  },
  headText: {
    textAlign: 'center',
    fontSize: 30,
  },
  subHeadText: {
    textAlign: 'center',
    fontSize: 18,
  },
  textInput: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 18,
  },
  alreadyText: {
    marginTop: 15,
    fontSize: 18,
  },
});

export default Login;
