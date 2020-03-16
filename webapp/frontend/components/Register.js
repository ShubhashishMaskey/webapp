import React, {useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Message from './Message';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from './API';

const Register = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const register = () => {
    setIsLoading(true);
    fetch(`${API}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        username: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setToggleDialog(true);
        setDialogMsg('Registration Successful.');
        setDialogTitle('Success');
      })
      .catch(error => {
        setIsLoading(false);
        setToggleDialog(true);
        setDialogMsg('Registration Unsuccessful. Try with different username.');
        setDialogTitle('Error');
      });
  };

  return (
    <KeyboardAvoidingView style={styles.registerView}>
      <ScrollView>
        <Message toggle={toggleDialog} title={dialogTitle} msg={dialogMsg} />
        <View style={styles.headView}>
          <Text style={styles.headText}>Welcome to WebI</Text>
          <Text style={styles.subHeadText}>create new account</Text>
        </View>
        <TextInput
          label="Firstname"
          mode="outlined"
          style={styles.textInput}
          value={firstname}
          onChangeText={text => setFirstname(text)}
        />
        <TextInput
          label="Lastname"
          mode="outlined"
          style={styles.textInput}
          value={lastname}
          onChangeText={text => setLastname(text)}
        />
        <TextInput
          label="Phone"
          mode="outlined"
          style={styles.textInput}
          value={phone}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          label="Address"
          mode="outlined"
          style={styles.textInput}
          value={address}
          onChangeText={text => setAddress(text)}
        />
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
          onPress={() => register()}
          labelStyle={styles.buttonLabel}
          style={styles.button}>
          Register
        </Button>
        <Text
          style={styles.alreadyText}
          onPress={() => navigation.navigate('Login')}>
          Already have an account ? Login here
        </Text>
        <Button onPress={() => AsyncStorage.removeItem('token').then(() => navigation.navigate("Login"))}>sldfj</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  registerView: {
    padding: 20,
  },
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

export default Register;
