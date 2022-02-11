import {useRoute} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  ImageBackground,
  Animated,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {getMovieDetails} from '../../queries/Search';
import config from '../../utils/Config';
import {Colors} from '../../utils/Constants';
import LoadingComponent from '../reuse/LoadingComponent';
import RatingIcon from '../../assets/icons/ic_rating.svg';
import AppButton from '../reuse/AppButton';
import {screenHeight} from '../../utils/Helper';
import NotifyPeopleModal from '../reuse/NotifyPeopleModel';
import {getAllUsers} from '../../features/slices/userReducerSlice';
import firestore from '@react-native-firebase/firestore';
import collections from '../../utils/collectionConstants';
import {useSelector} from 'react-redux';

const MovieDetailScreen = ({navigation}) => {
  let translation = useRef(new Animated.Value(screenHeight)).current;

  const recommendationsRef = firestore().collection(
    collections.RECOMMENDATIONS,
  );

  const user = useSelector(
    state => state.persistedUser?.savedUserInfo?.userInfo,
  );

  const route = useRoute();

  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isShowMore, setIsShowMore] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const onRecommendationClick = () => {
    getUsers();
  };

  const getUsers = async () => {
    try {
      setLoadingUsers(true);
      const allUsers = await getAllUsers();
      setLoadingUsers(false);
      if (allUsers) {
        setUsers(allUsers);
        setIsModalVisible(true);
      }
    } catch (error) {
      setLoadingUsers(false);
    }
  };

  const onListItemClick = (item, index) => {
    const usersCopy = [...users];
    usersCopy[index].isSelected = !usersCopy[index]?.isSelected;
    setUsers(usersCopy);
  };

  const getSelectedUsersToken = caption => {
    const userCopy = [...users];
    const selectedContacts = userCopy.filter(
      item => item?.isSelected && item?.deviceToken,
    );

    recommendationsRef
      .add({
        movie: movieDetails,
        creator: user,
        taggedUsers: selectedContacts,
        caption: caption.trim(),
        likes: 0,
      })
      .then(() => {
        setLoadingUsers(false);
        setIsModalVisible(false);
      })
      .catch(error => {
        setLoadingUsers(false);
        console.log(error);
      });
  };

  const onConfirmClick = caption => {
    setLoadingUsers(true);
    getSelectedUsersToken(caption);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    translation.setValue(new Animated.Value(screenHeight));
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
      {isModalVisible && (
        <NotifyPeopleModal
          users={users}
          onCloseModal={onModalClose}
          onListItemClick={onListItemClick}
          onConfirmClick={text => onConfirmClick(text)}
          isVisible={isModalVisible}
        />
      )}
      {(loadingUsers || loading) && <LoadingComponent />}
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
