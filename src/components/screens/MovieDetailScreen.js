import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {getMovieDetails} from '../../queries/Search';
import config from '../../utils/Config';
import {Colors} from '../../utils/Constants';
import LoadingComponent from '../reuse/LoadingComponent';
import RatingIcon from '../../assets/icons/ic_rating.svg';
import AppButton from '../reuse/AppButton';

const MovieDetailScreen = ({navigation}) => {
  const route = useRoute();

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isShowMore, setIsShowMore] = useState(true);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const result = await getMovieDetails(route.params?.movieId);

    if (result.status === 200) {
      setMovieDetails(result.data);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  const onRecommendationClick = () => {
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.conatiner}>
        <ImageBackground
          source={{uri: movieDetails?.Poster}}
          resizeMode="cover"
          blurRadius={3}
          style={styles.imageBackground}>
          <Image
            source={{uri: movieDetails?.Poster}}
            resizeMode="contain"
            style={styles.movieStyle}
          />
        </ImageBackground>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{movieDetails?.Title}</Text>
          <View style={styles.movieType}>
            <Text numberOfLines={1} style={styles.subTextStyle}>
              {movieDetails?.Genre}
            </Text>
            <View style={styles.ratingBox}>
              <RatingIcon
                width={12}
                height={12}
                style={{marginRight: moderateScale(5)}}
              />
              <Text style={styles.subTextStyle}>
                {movieDetails?.Ratings?.length > 0
                  ? movieDetails?.Ratings[0].Value
                  : ' Not Available'}
              </Text>
            </View>
          </View>
          <View style={styles.ratingBox}>
            <Text style={styles.subTextStyle}>{movieDetails?.Year}</Text>
            <Text style={styles.subTextStyle}> | </Text>
            <Text style={styles.subTextStyle}>{movieDetails?.Runtime}</Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text
              numberOfLines={isShowMore ? 3 : null}
              style={styles.subTextStyle}>
              {movieDetails?.Plot}
            </Text>
            <Text
              onPress={() => setIsShowMore(!isShowMore)}
              style={{...styles.subTextStyle, fontWeight: 'bold'}}
              numberOfLines={isShowMore ? 3 : null}>
              {isShowMore ? 'Show More ' : 'Show Less '}
            </Text>
          </View>
          <Text style={styles.subTitle}>Cast</Text>
          <Text style={styles.subTextStyle}>{movieDetails?.Actors}</Text>
          <Text style={styles.subTitle}>Directed by</Text>
          <Text style={styles.subTextStyle}>
            {movieDetails?.Director ? movieDetails?.Director : 'Anonymus'}
          </Text>
          <Text style={styles.subTitle}>Written by</Text>
          <Text style={styles.subTextStyle}>
            {movieDetails?.Writer ? movieDetails?.Writer : 'Anonymus'}
          </Text>
        </View>
      </ScrollView>
      <AppButton title="Send Recommendation" onPress={onRecommendationClick} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
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

export default MovieDetailScreen;
