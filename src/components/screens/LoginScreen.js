import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, StatusBar} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {storeUserInfo} from '../../features/slices/userReducerSlice';
import firestore from '@react-native-firebase/firestore';
import collections from '../../utils/collectionConstants';
import LinearGradient from 'react-native-linear-gradient';
import AppIcon from '../../assets/icons/ic_app_icon.svg';
import config from '../../utils/Config';
import {moderateScale} from 'react-native-size-matters';
import AppButton from '../reuse/AppButton';
import LoadingComponent from '../reuse/LoadingComponent';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const storeUserDataCloud = async userInfo => {
    const deviceToken = await messaging().getToken();
    firestore()
      .collection(collections.USERS)
      .doc(userInfo.id)
      .set({
        name: userInfo?.name,
        email: userInfo.email,
        id: userInfo.id,
        photo: userInfo.photo,
        deviceToken,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  const onGoogleSignIn = async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      if (userInfo) {
        storeUserDataCloud(userInfo?.user);
        dispatch(storeUserInfo(userInfo.user));
        setLoading(false);
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
      setLoading(false);
      console.log(error, 'ERROR');
    }
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: config.colors.primaryColor}} />
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle="light-content" translucent={true} />
        <LinearGradient
          colors={[config.colors.primaryColor, config.colors.secondryColor]}
          style={styles.conatiner}>
          <View style={styles.upperContainer}>
            <AppIcon width={70} height={70} />
            <Text style={styles.headlineText}>Welcome to Wadoo</Text>
            <Text style={styles.subText}>Let's find something intresting</Text>
          </View>
          <View style={{flex: 1}}>
            <AppButton
              title="SignIn with google"
              icon={config.icons.GOOGLE_ICON}
              onPress={onGoogleSignIn}
            />
          </View>
        </LinearGradient>
        {loading && <LoadingComponent />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: config.colors.secondryColor,
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headlineText: {
    fontFamily: config.fonts.bold,
    fontSize: moderateScale(35),
    marginTop: moderateScale(25),
    marginBottom: moderateScale(5),
    color: 'white',
  },
  subText: {
    fontFamily: config.fonts.bold,
    color: config.colors.subTextColor,
    fontSize: moderateScale(17),
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
