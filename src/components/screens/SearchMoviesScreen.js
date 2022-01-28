import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {getMovies} from '../../queries/Search';

let timer = 0;

const SearchMoviesScreen = () => {
  const [movieText, setMovieText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const getAllMovies = async text => {
    if (!text) {
      setSearchResult([]);
      return;
    }

    const result = await getMovies(text, 1);

    if (result) {
      console.log(result, 'result');
      setSearchResult(result?.data?.Search);
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
    return (
      <TouchableOpacity style={[styles.bookContainerStyle, styles.shadowProp]}>
        <Image
          source={{uri: item?.Poster}}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <View style={styles.titleView}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.Title}
          </Text>
          <Text numberOfLines={1} style={styles.subTextStyle}>
            Type: {item?.Type}
          </Text>
          <Text numberOfLines={1} style={styles.subTextStyle}>
            Release Year: {item?.Year}
          </Text>
        </View>
      </TouchableOpacity>
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
    backgroundColor: '#fbfbfb',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(18),
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
  bookContainerStyle: {
    // overflow: 'hidden',
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

export default SearchMoviesScreen;
