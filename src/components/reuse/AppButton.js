import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import config from '../../utils/Config';
import GoogleIcon from '../../assets/icons/ic_google.svg';

const AppButton = ({title, icon, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        ...style,
        paddingVertical: icon ? 0 : moderateScale(12),
      }}>
      {icon === config.icons.GOOGLE_ICON && (
        <GoogleIcon height={40} style={{marginTop: moderateScale(4)}} />
      )}
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    backgroundColor: config.colors.orangeColor,
  },
  titleStyle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: moderateScale(17),
    fontFamily: config.fonts.bold,
  },
});

export default AppButton;
