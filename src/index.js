import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ExploreScreen, LoginScreen} from '../src/components/screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Post" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ExploreScreen} />
    </Tab.Navigator>
  );
};

const RouteNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          options={{headerShown: false}}
          name="Tabs"
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
