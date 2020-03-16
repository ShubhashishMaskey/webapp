import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Register from './Register';
import Login from './Login';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const [isLoggedIn, setLogged] = useState(null);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Register') {
            iconName = 'ios-log-in';
          } else if (route.name === 'Login') {
            iconName = 'ios-log-in';
          } else if (route.name === 'Home') {
            iconName = 'ios-home';
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'darkslategrey',
      }}>
      <Tab.Screen name={isLoggedIn ? "Home" : "Register"}>
        {() => (
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen name="Register" component={Register} />
            ) : (
              <Stack.Screen name="Login" component={Login} />
            )}
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen name="Login">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Routes;
