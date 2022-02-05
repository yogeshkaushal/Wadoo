import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
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
import {getMovieDetails} from '../../queries/Search';
import LoadingComponent from '../reuse/LoadingComponent';

const MovieDetailScreen = ({navigation}) => {
  const route = useRoute();

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const result = await getMovieDetails(route.params?.movieId);

    if (result.status === 200) {
      console.log(result.data);
      setMovieDetails(result.data);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  const onRecommendationClick = () => {
    navigation.navigate('NotifyPeople', {movieDetails});
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.conatiner}>
        <View style={styles.upperContainerStyle}>
          <Image
            source={{uri: movieDetails?.Poster}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>{movieDetails?.Title}</Text>
            <Text numberOfLines={2} style={styles.subTextStyle}>
              {movieDetails?.Actors}
            </Text>
            <Text numberOfLines={1} style={styles.subTextStyle}>
              Writer:
              {movieDetails?.Writer
                ? ' ' + movieDetails?.Writer
                : ' ' + 'Anonymus'}
            </Text>
            <Text style={styles.rating}>
              Rating:
              {movieDetails?.Ratings?.length > 0
                ? movieDetails?.Ratings[0].Value
                : ' Not Available'}
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={{...styles.title, marginVertical: moderateScale(5)}}>
            Description
          </Text>
          <Text style={styles.description}>{movieDetails?.Plot}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={onRecommendationClick}
        style={styles.recommendationButton}>
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

export default MovieDetailScreen;
