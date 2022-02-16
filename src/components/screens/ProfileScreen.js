import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveImageOnfirebase,
  storeUserInfo,
  updateImage,
} from '../../features/slices/userReducerSlice';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingComponent from '../reuse/LoadingComponent';
import {SettingsIcon} from '../../utils/AppIcons';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {screenHeight, showAlert} from '../../utils/Helper';
import {moderateScale} from 'react-native-size-matters';
import config from '../../utils/Config';
import PostComponent from '../reuse/PostComponent';
import firestore from '@react-native-firebase/firestore';
import {types} from '../../utils/Constants';
import collections from '../../utils/collectionConstants';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {showActionSheetWithOptions} = useActionSheet();

  const user = useSelector(
    state => state.persistedUser?.savedUserInfo?.userInfo,
  );
  const myPostsRef = firestore().collection(collections.MY_POSTS);

  const [imageUrl, setImageUrl] = useState(user?.photo);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMyPosts();
  }, []);

  const getMyPosts = async () => {
    const docSnapshot = await myPostsRef.get();

    setLoading(false);
    setMyPosts(docSnapshot.docs);
  };

  const onLogOut = async () => {
    try {
      dispatch(storeUserInfo());
      await GoogleSignin.signOut();
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
    } catch (error) {
      console.error(error, 'ERROR');
    }
  };

  const onImageClick = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });
    saveImage(image.sourceURL);
    setImageUrl(image.sourceURL);
  };

  const uploadImageAndGetUrl = async (localUri, firebasePath) => {
    try {
      const imageRef = storage().ref(firebasePath);
      await imageRef.putFile(localUri, {contentType: 'image/jpg'});
      const url = await imageRef.getDownloadURL();
      return url;
    } catch (err) {}
  };

  const saveImage = async image => {
    try {
      const localUri =
        Platform.OS === 'ios' ? image.replace('file://', '') : image;
      setLoading(true);
      const imageUrl = await uploadImageAndGetUrl(localUri, `/${user?.name}/`);
      dispatch(updateImage(imageUrl));
      await saveImageOnfirebase(user?.id, imageUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onLogoutClick = async () => {
    const res = await showAlert('Are you sure you want to logout ?', true);
    if (res) {
      onLogOut();
    }
  };

  const onSettingsClick = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          onLogoutClick();
        }
      },
    );
  };

  const onClickPost = post => {
    if (post?.details?.type === types.MOVIE) {
      navigation.navigate('MovieDetailScreen', {movieId: post?.details?.id});
    } else {
      navigation.navigate('BookDetailScreen', {
        bookDetails: post?.details?.bookDetails,
      });
    }
  };

  const renderItem = (item, index) => {
    return (
      <PostComponent
        data={item?.data()}
        onClickPost={() => onClickPost(item?.data())}
      />
    );
  };

  const ListHeaderComponent = () => {
    return (
      <Text style={{...styles.usernameText, margin: moderateScale(20)}}>
        Posts
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        blurRadius={7}
        style={styles.bgImageStyle}
        source={{uri: imageUrl}}
      />
      <View style={styles.conatiner}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.imageView}
          onPress={onImageClick}>
          <Image source={{uri: imageUrl}} style={styles.profileStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={onSettingsClick}>
          <SettingsIcon height={22} width={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.usernameView}>
        <Text style={styles.usernameText}>Ankit Puri</Text>
        <Text style={styles.subText}>Ankit Puri</Text>
      </View>
      <FlatList
        data={myPosts}
        extraData={myPosts}
        ListHeaderComponent={ListHeaderComponent}
        style={{flexGrow: 1}}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      {loading && <LoadingComponent />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subText: {
    color: config.colors.subTextColor,
    fontSize: moderateScale(14),
  },
  imageView: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: moderateScale(50),
    borderColor: config.colors.orangeColor,
    top: moderateScale(-20),
    left: moderateScale(20),
  },
  settingsButton: {
    margin: moderateScale(15),
    padding: moderateScale(10),
  },
  bgImageStyle: {
    width: '100%',
    height: moderateScale(100),
  },
  profileStyle: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(50),
    backgroundColor: 'white',
  },
  safeAreaView: {
    flex: 1,
  },
  usernameText: {
    color: 'white',
    fontSize: moderateScale(19),
    fontFamily: config.fonts.bold,
  },
  usernameView: {
    paddingLeft: moderateScale(20),
    paddingBottom: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: config.colors.secondryColor,
  },
});

export default ProfileScreen;
