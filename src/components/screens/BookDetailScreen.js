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
import {Colors, types} from '../../utils/Constants';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import collections from '../../utils/collectionConstants';
import {getAllUsers} from '../../features/slices/userReducerSlice';
import NotifyPeopleModal from '../reuse/NotifyPeopleModel';
import LoadingComponent from '../reuse/LoadingComponent';

const BookDetailScreen = () => {
  const route = useRoute();

  const recommendationsRef = firestore().collection(
    collections.RECOMMENDATIONS,
  );

  const user = useSelector(
    state => state.persistedUser?.savedUserInfo?.userInfo,
  );

  const [bookDetails, setBookDetails] = useState(route.params?.bookDetails);
  const [isShowMore, setIsShowMore] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = {
    type: types.BOOK,
    rating: bookDetails?.volumeInfo?.averageRating || ' Not Available',
    cover: bookDetails?.volumeInfo?.imageLinks?.thumbnail,
    title: bookDetails?.volumeInfo?.title,
    id: bookDetails?.id,
    bookDetails: route.params?.bookDetails,
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
        details: {...data},
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
  };

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
      {isModalVisible && (
        <NotifyPeopleModal
          users={users}
          onCloseModal={onModalClose}
          onListItemClick={onListItemClick}
          onConfirmClick={text => onConfirmClick(text)}
          isVisible={isModalVisible}
        />
      )}
      {loadingUsers && <LoadingComponent />}
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
