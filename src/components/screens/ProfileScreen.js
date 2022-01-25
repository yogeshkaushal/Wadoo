import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {storeUserInfo} from '../../features/counter/userReducerSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogOut = async () => {
    try {
      dispatch(storeUserInfo({}));
      await GoogleSignin.signOut();
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    } catch (error) {
      console.error(error, 'ERROR');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <TouchableOpacity onPress={onLogOut} style={styles.logoutButton}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 10,
  },
});

export default ProfileScreen;
