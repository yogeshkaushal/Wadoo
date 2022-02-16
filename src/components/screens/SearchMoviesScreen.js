import {useNavigation} from '@react-navigation/core';
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
  ActivityIndicator,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {getMovies} from '../../queries/Search';
import config from '../../utils/Config';
import SearchIcon from '../../assets/icons/ic_search.svg';
import {capitalizeFirstLetter, screenWidth} from '../../utils/Helper';
import SearchBar from '../reuse/SearchBar';
import LottieView from 'lottie-react-native';

let timer = 0;

const SearchMoviesScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const getAllMovies = async text => {
    setLoading(true);

    if (!text) {
      setSearchResult([]);
      return;
    }

    try {
      const result = await getMovies(text, 1);

      if (result) {
        setSearchResult(result?.data?.Search);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(error);
    }
  };

  const onPressItem = item => {
    navigation.navigate('MovieDetailScreen', {movieId: item?.imdbID});
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={[styles.bookContainerStyle, styles.shadowProp]}>
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
            {capitalizeFirstLetter(item?.Type)}
          </Text>
          <Text numberOfLines={1} style={styles.subTextStyle}>
            {item?.Year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <SearchBar
          placeholder="Search Movies"
          onSearch={searchText => getAllMovies(searchText)}
        />
        {/* <LottieView
          source={require('../../assets/json/lf20_aUotIn.json')}
          style={{width: 50, height: 50, alignSelf: 'center'}}
          autoPlay
          loop
        /> */}
        {loading ? (
          <ActivityIndicator
            color={config.colors.orangeColor}
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <FlatList
            data={searchResult}
            extraData={searchResult}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: config.colors.primaryColor,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: config.colors.primaryColor,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: config.fonts.regular,
    color: 'white',
    fontSize: moderateScale(18),
  },
  textInput: {
    paddingVertical: moderateScale(8),
    marginLeft: moderateScale(15),
    fontSize: moderateScale(15),
    color: 'white',
    width: '85%',
  },
  bookContainerStyle: {
    // overflow: 'hidden',
    backgroundColor: config.colors.secondryColor,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
    width: '95%',
  },
  imageStyle: {
    borderRadius: moderateScale(8),
    backgroundColor: config.colors.subTextColor,
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
    fontFamily: config.fonts.regular,
    fontSize: moderateScale(14),
    color: config.colors.subTextColor,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: moderateScale(25),
    // marginBottom: moderateScale(10),
    // paddingVertical: moderateScale(5),
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationStyle: {
    width: screenWidth / 2,
    backgroundColor: config.colors.primaryColor,
  },
});

export default SearchMoviesScreen;
