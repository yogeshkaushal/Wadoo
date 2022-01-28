import {useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const BookDetailScreen = () => {
  const route = useRoute();
  console.log(route.params?.bookDetails);

  const [bookDetails, setBookDetails] = useState(route.params?.bookDetails);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.conatiner}>
        <View style={styles.upperContainerStyle}>
          <Image
            source={{uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>{bookDetails?.volumeInfo?.title}</Text>
            {bookDetails?.volumeInfo?.subtitle && (
              <Text numberOfLines={2} style={styles.subTextStyle}>
                {bookDetails?.volumeInfo?.subtitle}
              </Text>
            )}
            <Text numberOfLines={1} style={styles.subTextStyle}>
              Author:
              {bookDetails?.volumeInfo?.authors?.length > 0
                ? ' ' + bookDetails?.volumeInfo?.authors[0]
                : ' ' + 'Anonymus'}
            </Text>
            <Text style={styles.rating}>
              Rating:
              {bookDetails?.volumeInfo?.averageRating || ' Not Available'}
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={{...styles.title, marginVertical: moderateScale(5)}}>
            Description
          </Text>
          <Text style={styles.description}>
            {bookDetails?.volumeInfo?.description ||
              bookDetails?.volumeInfo?.subtitle}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.recommendationButton}>
        <Text style={{fontWeight: 'bold'}}>Send Recommendation</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  upperContainerStyle: {
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
    width: moderateScale(100),
    height: moderateScale(140),
  },
  titleView: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  subTextStyle: {
    marginVertical: 3,
    color: 'grey',
    fontSize: moderateScale(13),
  },
  rating: {
    color: '#FFBC01',
    fontWeight: 'bold',
  },
  bottomContainer: {
    paddingHorizontal: moderateScale(20),
  },
  description: {
    color: 'grey',
    textAlign: 'auto',
    lineHeight: 23,
    fontSize: moderateScale(16),
  },
  recommendationButton: {
    width: '95%',
    backgroundColor: '#FFBC01',
    marginVertical: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
  },
});

export default BookDetailScreen;
