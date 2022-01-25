import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';

const SearchItemScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    'AIzaSyCqi37mzRrzkBrDZDb0BX9_IarX5iMOT88',
  );

  const handleChange = searchText => {
    setBook(searchText);
  };
  const handleSubmit = () => {
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          book +
          '&key=' +
          apiKey +
          '&maxResults=40',
      )
      .then(data => {
        console.log(data.data.items, 'DATA');
        setResult(data.data.items);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <TextInput
          placeholder="Search Books"
          onChangeText={handleChange}
          style={{width: '100%'}}
        />
        <Button onPress={handleSubmit} />
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
});

export default SearchItemScreen;
