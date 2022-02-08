import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import config from '../../utils/Config';
import {moderateScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

const CreatePostScreen = () => {
  const colorsArray1 = ['#EF5012', '#FF7E4B'];
  const colorsArray2 = ['#12B4EF', '#4BC4FF'];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <View style={styles.upperContainer}>
          <Text style={styles.headlineText}>Recommend</Text>
          <Text style={styles.subText}>Choose what you want to Recommend</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchMoviesScreen')}
            style={styles.selectionBox}>
            <LinearGradient colors={colorsArray1} style={styles.gradientBox}>
              <ImageBackground
                style={styles.imageBackground}
                source={require('../../assets/icons/img_movie_background.png')}
              />
              <Text style={styles.headlineText}>Movies</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchBooksScreen')}
            style={styles.selectionBox}>
            <LinearGradient colors={colorsArray2} style={styles.gradientBox}>
              <ImageBackground
                style={styles.imageBackground}
                source={require('../../assets/icons/img_book.png')}
              />
              <Text style={styles.headlineText}>Books</Text>
            </LinearGradient>
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionBox: {
    width: '48%',
  },
  gradientBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(110),
    borderRadius: moderateScale(10),
  },
  upperContainer: {
    flex: 0.2,
  },
  imageBackground: {
    width: moderateScale(70),
    height: moderateScale(70),
    position: 'absolute',
    left: moderateScale(20),
  },
});

export default CreatePostScreen;
