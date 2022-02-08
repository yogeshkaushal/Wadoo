import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllUsers} from '../../features/slices/userReducerSlice';
import LoadingComponent from '../reuse/LoadingComponent';
import {useRoute} from '@react-navigation/core';
import {Colors} from '../../utils/Constants';
import AppButton from '../reuse/AppButton';
import { moderateScale } from 'react-native-size-matters';
const {grey, white, bgColor, orange} = Colors;

const NotifyPeopleModal = ({isVisible}) => {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [users, setUsers] = useState([]);
  const {params} = useRoute();

  const movieImage = params?.movieDetails?.Poster;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();
      setLoading(false);
      if (allUsers) {
        return setUsers(allUsers);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onListItemClick = (item, index) => {
    const usersCopy = [...users];
    usersCopy[index].isSelected = !usersCopy[index]?.isSelected;
    setUsers(usersCopy);
  };

  const userListItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onListItemClick(item, index)}
        style={styles.listItemStyle}>
        <Image style={styles.userImageStyle} />
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const getSelectedUsersToken = () => {
    const userCopy = [...users];
    const selectedContacts = userCopy.filter(
      item => item?.isSelected && item?.deviceToken,
    );
    console.log(selectedContacts);
  };

  const onConfirmClick = () => {
    getSelectedUsersToken();
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.bottomStyle}>
        <Text style={styles.notify}>Notify Friends</Text>
        <Text style={styles.subHeading}>
          Select the friends you want to notify
        </Text>
        <FlatList
          style={styles.listStyle}
          data={users}
          renderItem={({item, index}) => userListItem(item, index)}
        />
        <TextInput
          selectionColor={white}
          style={styles.inputStyle}
          placeholderTextColor={grey}
          onChangeText={text => setCaption(text)}
          value={caption}
          placeholder="Write something here..."
        />
        <AppButton
          onPress={onConfirmClick}
          style={styles.buttonStyle}
          title="Confirm and Post"
        />
      </View>
      {loading && <LoadingComponent />}
    </Modal>
  );
};

export default NotifyPeopleModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonStyle: {
    marginTop: 10,
    width: '100%',
  },
  inputStyle: {
    // backgroundColor: 'red',
    height: 40,
    paddingHorizontal: 10,
    color: white,
  },
  userName: {
    marginLeft: 20,
    color: white,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  userImageStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: white,
  },
  listItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 0.2,
    borderBottomColor: grey,
  },
  movieStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
  },
  subHeading: {
    color: grey,
    marginTop: 2,
    fontSize: 12,
  },
  listStyle: {
    marginTop: 20,
  },
  notify: {
    color: white,
    fontSize: 22,
    fontWeight: '700',
  },
  bottomStyle: {
    flex: 1,
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(30),
    backgroundColor: bgColor,
  },
});