import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
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
import {showAlert} from '../../utils/Helper';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {showActionSheetWithOptions} = useActionSheet();
  const user = useSelector(
    state => state.persistedUser?.savedUserInfo?.userInfo,
  );
  const [imageUrl, setImageUrl] = useState(user?.photo);
  const [loading, setLoading] = useState(false);

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
    if (res) onLogOut();
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
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ImageBackground
        blurRadius={7}
        style={styles.bgImageStyle}
        source={{uri: imageUrl}}
      />
      <View style={styles.conatiner}>
        <TouchableOpacity onPress={onSettingsClick}>
          <SettingsIcon height={22} width={22} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.imageView} onPress={onImageClick}>
        <Image source={{uri: imageUrl}} style={styles.profileStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogOut} style={styles.logoutButton}>
        <Text>Logout</Text>
      </TouchableOpacity>
      {loading && <LoadingComponent />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 0.8,
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  imageView: {
    position: 'absolute',
    top: 120,
    left: 30,
  },
  bgImageStyle: {
    flex: 0.2,
  },
  profileStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  safeAreaView: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 10,
  },
});

export default ProfileScreen;
