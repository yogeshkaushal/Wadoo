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
  ImageBackground,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import AppButton from '../reuse/AppButton';
import {useNavigation} from '@react-navigation/core';
import RatingIcon from '../../assets/icons/ic_rating.svg';
import config from '../../utils/Config';
import { Colors } from '../../utils/Constants';

const BookDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params?.bookDetails);

  const [bookDetails, setBookDetails] = useState(route.params?.bookDetails);
  const [isShowMore, setIsShowMore] = useState(true);

  const onRecommendationClick = () => {
    navigation.navigate('NotifyPeople', {bookDetails});
  };

  console.log(bookDetails);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.conatiner}>
        <ImageBackground
          source={{uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail}}
          resizeMode="cover"
          blurRadius={3}
          style={styles.imageBackground}>
          <Image
            source={{uri: bookDetails?.volumeInfo?.imageLinks?.thumbnail}}
            resizeMode="contain"
            style={styles.movieStyle}
          />
        </ImageBackground>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{bookDetails?.volumeInfo?.title}</Text>
          <View style={styles.movieType}>
            <Text numberOfLines={1} style={styles.subTextStyle}>
              {bookDetails?.volumeInfo?.categories[0]}
            </Text>
            <View style={styles.ratingBox}>
              <RatingIcon
                width={12}
                height={12}
                style={{marginRight: moderateScale(5)}}
              />
              <Text style={styles.subTextStyle}>
                {bookDetails?.volumeInfo?.averageRating || ' Not Available'}
              </Text>
            </View>
          </View>
          <View style={styles.ratingBox}>
            <Text style={styles.subTextStyle}>
              {bookDetails?.volumeInfo?.publishedDate.split()[0]}
            </Text>
            <Text style={styles.subTextStyle}> | </Text>
            <Text style={styles.subTextStyle}>
              {bookDetails?.volumeInfo?.pageCount} Pages
            </Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text
              numberOfLines={isShowMore ? 3 : null}
              style={styles.subTextStyle}>
              {bookDetails?.volumeInfo?.description ||
                bookDetails?.volumeInfo?.subtitle}
            </Text>
            <Text
              onPress={() => setIsShowMore(!isShowMore)}
              style={{...styles.subTextStyle, fontWeight: 'bold'}}
              numberOfLines={isShowMore ? 3 : null}>
              {isShowMore ? 'Show More ' : 'Show Less '}
            </Text>
          </View>
          <Text style={styles.subTitle}>Publisher</Text>
          <Text style={styles.subTextStyle}>
            {bookDetails?.volumeInfo?.publisher}
          </Text>
          <Text style={styles.subTitle}>Written by</Text>
          <Text style={styles.subTextStyle}>
            {bookDetails?.volumeInfo?.authors?.length > 0
              ? bookDetails?.volumeInfo?.authors[0]
              : 'Anonymus'}
          </Text>
        </View>
      </ScrollView>
      <AppButton title="Send Recommendation" onPress={onRecommendationClick} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  movieType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showMore: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  subTitle: {
    color: 'white',
    marginTop: moderateScale(25),
    fontFamily: config.fonts.bold,
    fontSize: moderateScale(20),
  },
  imageBackground: {
    aspectRatio: 2 / 1.5,
  },
  movieStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'white',
    fontFamily: config.fonts.bold,
    fontSize: moderateScale(25),
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  descriptionBox: {
    marginVertical: moderateScale(10),
  },
  subTextStyle: {
    marginVertical: 3,
    color: config.colors.subTextColor,
    fontSize: moderateScale(14),
  },
  bottomContainer: {
    padding: moderateScale(20),
  },
});

export default BookDetailScreen;
