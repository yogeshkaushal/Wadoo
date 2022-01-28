import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  BookDetailScreen,
  CreatePostScreen,
  ExploreScreen,
  LoginScreen,
  MovieDetailScreen,
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
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#fbfbfb',
          },
        }}>
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
        <Stack.Screen
          name="BookDetailScreen"
          component={BookDetailScreen}
          options={{
            headerTitle: 'Details',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{
            headerTitle: 'Details',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
