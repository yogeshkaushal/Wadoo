import React from 'react';
import {LogBox, StatusBar, StyleSheet} from 'react-native';
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
import AuthLoading from '../components/screens/AuthLoading';
import config from '../utils/Config';
import HomeIcon from '../assets/icons/ic_home.svg';
import AddPostIcon from '../assets/icons/ic_bottom_add.svg';
import ProfileIcon from '../assets/icons/ic_profile.svg';
import {moderateScale} from 'react-native-size-matters';
import NotifyPeople from '../components/screens/NotifyPeople';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

const screenOptions = (route, color) => {
  switch (route.name) {
    case 'Explore':
      return <HomeIcon style={{marginTop: moderateScale(8)}} />;
    case 'Recommend':
      return <AddPostIcon />;
    case 'Profile':
      return <ProfileIcon style={{marginTop: moderateScale(8)}} />;
    default:
      return;
  }
};

const TabNavigator = () => {
  // For custom tab pass tabBar={props => <TabBarComponent {...props} />} to Tab.Navigator as a prop
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => screenOptions(route, color),
        tabBarLabel: '',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'black',
          position: 'absolute',
        },
      })}
      sceneContainerStyle={styles.tabContainer}>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Recommend" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const RouteNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent={true} />
      <Stack.Navigator
        initialRouteName={'AuthLoading'}
        screenOptions={{
          headerTintColor: 'black',
        }}>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Tabs"
          component={TabNavigator}
        />
        <Stack.Screen
          name="SearchBooksScreen"
          component={SearchBooksScreen}
          options={{
            headerStyle: {
              backgroundColor: config.colors.primaryColor,
            },
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="NotifyPeople"
          component={NotifyPeople}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchMoviesScreen"
          component={SearchMoviesScreen}
          options={{
            headerStyle: {
              backgroundColor: config.colors.primaryColor,
            },
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitle: '',
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
            headerShown: false,
            headerStyle: {
              backgroundColor: config.colors.primaryColor,
            },
            headerTintColor: 'white',
            headerShadowVisible: false,
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: config.colors.primaryColor,
  },
});

export default RouteNavigator;
