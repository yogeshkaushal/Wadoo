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

const CreatePostScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <Text>Recommend</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchMoviesScreen')}
          style={styles.optionsButton}>
          <Text style={styles.moviesText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchBooksScreen')}
          style={styles.optionsButton}>
          <Text>Books</Text>
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
  optionsButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 10,
  },
  moviesText: {
    fontFamily: 'Roboto-Thin',
  },
});

export default CreatePostScreen;
