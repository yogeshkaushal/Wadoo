import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import config from '../../utils/Config';
import { moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

const CreatePostScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // onPress={() => navigation.navigate('SearchMoviesScreen')}
  // onPress={() => navigation.navigate('SearchBooksScreen')}

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <Text style={styles.headlineText}>Recommend</Text>
        <Text style={styles.subText}>Choose what you want to Recommend</Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.selectionBox}>
             
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
  },
  safeAreaView: {
    flex: 1,
  },
  headlineText: {
    fontFamily: config.fonts.bold,
    fontSize: moderateScale(25),
    marginBottom: moderateScale(5),
    color: 'white',
  },
  subText: {
    fontFamily: config.fonts.bold,
    color: config.colors.subTextColor,
    fontSize: moderateScale(17),
  },
  bottomContainer:{
    flexDirection: 'row',
  },
  selectionBox:{

  }
});

export default CreatePostScreen;
