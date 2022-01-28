import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {getBooksByName} from '../../queries/Search';
import {useDispatch} from 'react-redux';
import {storeAllBooks} from '../../features/slices/savedBooksSlice';
import {useNavigation} from '@react-navigation/core';

let timer = 0;

const SearchBooksScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [book, setBook] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const getAllBooks = async text => {
    if (!text) {
      setSearchResult([]);
      return;
    }

    const result = await getBooksByName(text, 30);

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

  const onPressItem = item => {
    navigation.navigate('BookDetailScreen', {bookDetails: item});
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={[styles.bookContainerStyle, styles.shadowProp]}>
        <Image
          source={{uri: item?.volumeInfo?.imageLinks?.thumbnail}}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <View style={styles.titleView}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.volumeInfo?.title}
          </Text>
          {item?.volumeInfo?.subtitle ? (
            <Text numberOfLines={2} style={styles.subTextStyle}>
              {item?.volumeInfo?.subtitle}
            </Text>
          ) : (
            <Text numberOfLines={2} style={styles.subTextStyle}>
              {item?.volumeInfo?.description}
            </Text>
          )}
          <Text numberOfLines={1} style={styles.subTextStyle}>
            Author:
            {item?.volumeInfo?.authors?.length > 0
              ? ' ' + item?.volumeInfo?.authors[0]
              : ' ' + 'Anonymus'}
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
    backgroundColor: '#fbfbfb',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fbfbfb',
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
