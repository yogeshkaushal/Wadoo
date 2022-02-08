import React from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import config from '../../utils/Config';
import PostComponent from '../reuse/PostComponent';
import AppIcon from '../../assets/icons/ic_app_icon.svg';
import {moderateScale} from 'react-native-size-matters';

const ExploreScreen = () => {
  const data = [
    {
      image:
        'https://m.media-amazon.com/images/M/MV5BMjA0MDc1NTk0Ml5BMl5BanBnXkFtZTgwMTk2ODA5NDM@._V1_SX300.jpg',
    },
    {
      image:
        'https://m.media-amazon.com/images/M/MV5BMTg2MTMyMzU0M15BMl5BanBnXkFtZTgwOTU3ODk4NTE@._V1_SX300.jpg',
    },
    {
      image:
        'https://m.media-amazon.com/images/M/MV5BMjA0MDc1NTk0Ml5BMl5BanBnXkFtZTgwMTk2ODA5NDM@._V1_SX300.jpg',
    },
  ];

  const renderItem = (item, index) => {
    return <PostComponent data={item} />;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <AppIcon style={styles.icon} width={25} height={25} />
      <FlatList
        data={data}
        extraData={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: moderateScale(10),
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: config.colors.primaryColor,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 10,
  },
});

export default ExploreScreen;
