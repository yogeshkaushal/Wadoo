import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  CreatePostScreen,
  ExploreScreen,
  LoginScreen,
  ProfileScreen,
  SearchBooksScreen,
  SearchMoviesScreen,
} from '../components/screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Post" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
        <Stack.Screen
          name="SearchBooksScreen"
          component={SearchBooksScreen}
          options={{
            headerTitle: 'Search Books',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="SearchMoviesScreen"
          component={SearchMoviesScreen}
          options={{
            headerTitle: 'Search Movies',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
