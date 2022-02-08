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
import HomeIconInactive from '../assets/icons/ic_home_inactive.svg';
import HomeIconActive from '../assets/icons/ic_home_active.svg';
import CreatePostInactive from '../assets/icons/ic_create_post_inactive.svg';
import CreatePostActive from '../assets/icons/ic_create_post_active.svg';
import NotificationInactive from '../assets/icons/ic_notification_inactive.svg';
import NotificationActive from '../assets/icons/ic_notification_active.svg';
import ProfileActive from '../assets/icons/ic_profile_active.svg';
import ProfileInactive from '../assets/icons/ic_profile_inactive.svg';
import {moderateScale} from 'react-native-size-matters';
import NotifyPeople from '../components/screens/NotifyPeople';
import {BlurView} from '@react-native-community/blur';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

const screenOptions = (route, color, focused) => {
  switch (route.name) {
    case 'Explore':
      return focused ? (
        <HomeIconActive style={styles.tabIconMargin} />
      ) : (
        <HomeIconInactive style={styles.tabIconMargin} />
      );
    case 'Recommend':
      return focused ? (
        <CreatePostActive style={styles.tabIconMargin} />
      ) : (
        <CreatePostInactive style={styles.tabIconMargin} />
      );
    case 'Notification':
      return focused ? (
        <NotificationActive style={styles.tabIconMargin} />
      ) : (
        <NotificationInactive style={styles.tabIconMargin} />
      );
    case 'Profile':
      return focused ? (
        <ProfileActive style={styles.tabIconMargin} />
      ) : (
        <ProfileInactive style={styles.tabIconMargin} />
      );
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
        tabBarIcon: ({color, focused}) => screenOptions(route, color, focused),
        tabBarLabel: '',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          position: 'absolute',
        },
        tabBarBackground: () => (
          <BlurView
            blurType="thinMaterialDark"
            blurAmount={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      })}
      sceneContainerStyle={styles.tabContainer}>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Recommend" component={CreatePostScreen} />
      <Tab.Screen name="Notification" component={ExploreScreen} />
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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MovieDetailScreen"
          component={MovieDetailScreen}
          options={{
            headerShown: false,
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
  tabIconMargin: {
    marginTop: moderateScale(8),
  },
});

export default RouteNavigator;
