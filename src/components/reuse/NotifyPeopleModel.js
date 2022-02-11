import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Constants';
import AppButton from '../reuse/AppButton';
import {moderateScale} from 'react-native-size-matters';
import {screenHeight} from '../../utils/Helper';
import SelectedIcon from '../../assets/icons/ic_selected.svg';
import config from '../../utils/Config';
import {useSelector} from 'react-redux';

const {grey, white, bgColor} = Colors;

const NotifyPeopleModal = ({
  users,
  isVisible,
  onCloseModal,
  onListItemClick,
  onConfirmClick,
}) => {
  const [caption, setCaption] = useState('');

  const user = useSelector(
    state => state.persistedUser?.savedUserInfo?.userInfo,
  );

  const userListItem = (item, index) => {
    if (item?.id === user.id) {
      return;
    }

    return (
      <TouchableOpacity
        onPress={() => onListItemClick(item, index)}
        style={styles.listItemStyle}>
        <Image style={styles.userImageStyle} />
        <Text style={styles.userName}>{item.name}</Text>
        {item?.isSelected && <SelectedIcon width={18} height={18} />}
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <TouchableOpacity
        onPress={onCloseModal}
        activeOpacity={1}
        style={styles.globalTouch}>
        <View style={styles.bottomStyle}>
          <Text style={styles.notify}>Notify Friends</Text>
          <Text style={styles.subHeading}>
            Select the friends you want to notify
          </Text>
          {users?.length > 0 ? (
            <>
              <FlatList
                style={styles.listStyle}
                data={users}
                renderItem={({item, index}) => userListItem(item, index)}
              />
              <TextInput
                selectionColor={white}
                style={styles.inputStyle}
                placeholderTextColor={grey}
                onChangeText={setCaption}
                value={caption}
                placeholder="Write something here..."
              />
              <AppButton
                onPress={() => onConfirmClick(caption)}
                style={styles.buttonStyle}
                title="Confirm and Post"
              />
            </>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={[styles.notify, styles.noUserFound]}>
                No Users Found
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

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
    marginLeft: moderateScale(20),
    color: white,
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: config.fonts.regular,
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
    marginTop: moderateScale(20),
    maxHeight: moderateScale(screenHeight / 2.5),
  },
  notify: {
    color: white,
    fontSize: 22,
    fontWeight: '700',
  },
  bottomStyle: {
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(30),
    backgroundColor: bgColor,
  },
  globalTouch: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  noUserFound: {
    alignSelf: 'center',
    marginVertical: moderateScale(30),
  },
});

export default NotifyPeopleModal;
