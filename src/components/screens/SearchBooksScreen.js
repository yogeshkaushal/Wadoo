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
  ActivityIndicator,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {getBooksByName} from '../../queries/Search';
import {useNavigation} from '@react-navigation/core';
import Icon from '../../assets/icons/ic_profile_inactive.svg';
import config from '../../utils/Config';

let timer = 0;

const SearchBooksScreen = () => {
  const navigation = useNavigation();

  const [book, setBook] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const getAllBooks = async text => {
    setLoading(true);

    if (!text) {
      setSearchResult([]);
      return;
    }

    try {
      const result = await getBooksByName(text, 30);

      if (result.data) {
        setLoading(false);
        setSearchResult(result.data.items);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(error);
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
        <View style={styles.inputContainer}>
          <Icon style={{marginLeft: moderateScale(5)}} />
          <TextInput
            placeholder="Search Books"
            placeholderTextColor={config.colors.subTextColor}
            onChangeText={text => debounce(text, 300)}
            style={styles.textInput}
          />
        </View>
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
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
    marginBottom: moderateScale(10),
    paddingVertical: moderateScale(5),
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBooksScreen;
