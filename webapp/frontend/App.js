import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './components/Routes';
import {Provider} from 'react-native-paper';

const App = () => {
  return (
    <Provider>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
