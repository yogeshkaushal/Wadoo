import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import config from '../../utils/Config';
import {Colors} from '../../utils/Constants';
import LottieView from 'lottie-react-native';
import {screenWidth} from '../../utils/Helper';
import {useNavigation, useRoute} from '@react-navigation/core';
import AppButton from '../reuse/AppButton';

const SuccessScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();

  const onNavigate = () => {
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LottieView
        source={require('../../assets/json/animation.json')}
        autoPlay
        loop
        style={styles.animationStyle}
      />
      <Text style={styles.headlineText}>
        Your {params?.type} is now recommended!
      </Text>
      <AppButton
        title="Go back home"
        onPress={onNavigate}
        style={{width: screenWidth / 2}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  animationStyle: {
    width: screenWidth / 2,
  },
  headlineText: {
    fontFamily: config.fonts.bold,
    textAlign: 'center',
    fontSize: moderateScale(25),
    marginBottom: moderateScale(35),
    color: 'white',
  },
});

export default SuccessScreen;
