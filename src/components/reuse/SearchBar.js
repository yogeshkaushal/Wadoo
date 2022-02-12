import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import SearchIcon from '../../assets/icons/ic_search.svg';
import config from '../../utils/Config';

let timer = 0;

const SearchBar = ({
  placeholder,
  iconStyle,
  containerStyle,
  inputStyle,
  onSearch,
}) => {
  const debounce = (text, delay) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onSearch(text.trim());
    }, delay);
  };

  return (
    <View style={{...styles.inputContainer, ...containerStyle}}>
      <SearchIcon
        width={20}
        height={20}
        style={{marginLeft: moderateScale(5), ...iconStyle}}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={config.colors.subTextColor}
        onChangeText={text => debounce(text, 300)}
        style={{...styles.textInput, ...inputStyle}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: moderateScale(8),
    marginLeft: moderateScale(15),
    fontSize: moderateScale(15),
    color: 'white',
    width: '85%',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: moderateScale(25),
    // marginBottom: moderateScale(10),
    // paddingVertical: moderateScale(5),
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchBar;
