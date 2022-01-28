import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {moderateScale} from 'react-native-size-matters';
import {GOOGLE_BOOKS_API_KEY} from '@env';
import {getBooks} from '../../queries/Search';

let timer = 0;

const SearchBooksScreen = () => {
  const [book, setBook] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const getAllBooks = async text => {
    if (!text) {
      setSearchResult([]);
      return;
    }

    const result = await getBooks(text, 30);

    if (result.data) {
      console.log(result.data);
      setSearchResult(result.data.items);
    }
  };

  const debounce = (text, delay) => {
    setBook(text);

    clearTimeout(timer);
    timer = setTimeout(() => {
      getAllBooks(text);
    }, delay);
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity style={[styles.bookContainerStyle, styles.shadowProp]}>
        <Image
          source={{uri: item?.volumeInfo?.imageLinks?.thumbnail}}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <View style={styles.titleView}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.volumeInfo?.title}
          </Text>
          {item?.volumeInfo?.subtitle && (
            <Text numberOfLines={2} style={styles.subTextStyle}>
              {item?.volumeInfo?.subtitle}
            </Text>
          )}
          <Text numberOfLines={1} style={styles.subTextStyle}>
            Business & Economics
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <TextInput
          placeholder="Search Books"
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
  bookContainerStyle: {
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
    width: '95%',
  },
  imageStyle: {
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(255, 87, 51,0.2 )',
    width: moderateScale(60),
    height: moderateScale(100),
  },
  titleView: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
  },
  subTextStyle: {
    marginVertical: 3,
    color: 'grey',
    fontSize: moderateScale(13),
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SearchBooksScreen;
