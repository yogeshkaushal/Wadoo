import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {storeUserInfo} from '../../features/counter/userReducerSlice';
import firestore from '@react-native-firebase/firestore';
import collections from '../../utils/collectionConstants';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const storeUserDataCloud = userInfo => {
    firestore()
      .collection(collections.USERS)
      .doc(userInfo.id)
      .set({
        name: userInfo?.name,
        email: userInfo.email,
        id: userInfo.id,
        photo: userInfo.photo,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const onGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      if (userInfo) {
        storeUserDataCloud(userInfo?.user);
        dispatch(storeUserInfo(userInfo.user));
      }

      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Tabs',
          },
        ],
      });
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error, 'ERROR');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleSignIn}
        />
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
  buttonStyle: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 10,
  },
});

export default LoginScreen;
