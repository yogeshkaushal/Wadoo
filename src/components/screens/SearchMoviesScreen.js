import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {moderateScale} from 'react-native-size-matters';
import {OMDB_API_KEY} from '@env';

let timer = 0;

const SearchMoviesScreen = () => {
  const [movieText, setMovieText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const getAllMovies = async text => {
    if (!text) {
      setSearchResult([]);
      return;
    }

    const result = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=*${text}*&page=1`,
    );

    if (result) {
      console.log(result, 'result');
      //   setSearchResult(result.data.items);
    }
  };

  const debounce = (text, delay) => {
    setMovieText(text);

    clearTimeout(timer);
    timer = setTimeout(() => {
      getAllMovies(text);
    }, delay);
  };

  const renderItem = (item, index) => {
    console.log(item, 'ITEM');
    return (
      <View style={styles.bookContainerStyle}>
        <Text numberOfLines={2} style={styles.title}>
          {item?.volumeInfo?.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <TextInput
          placeholder="Search Movies"
          onChangeText={text => debounce(text, 300)}
          style={styles.textInput}
        />
        <FlatList
          data={searchResult}
          extraData={searchResult}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  textInput: {
    backgroundColor: 'lightgrey',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    width: '95%',
    alignSelf: 'center',
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
  bookContainerStyle: {
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(10),
  },
});

export default SearchMoviesScreen;
