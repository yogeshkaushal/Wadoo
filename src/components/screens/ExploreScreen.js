import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import config from '../../utils/Config';
import PostComponent from '../reuse/PostComponent';
import AppIcon from '../../assets/icons/ic_app_icon.svg';
import {moderateScale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import collections from '../../utils/collectionConstants';
import LoadingComponent from '../reuse/LoadingComponent';
import {useNavigation} from '@react-navigation/core';

const ExploreScreen = () => {
  const navigation = useNavigation();
  const recommendationsRef = firestore().collection(
    collections.RECOMMENDATIONS,
  );

  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPost] = useState([]);

  useEffect(() => {
    setLoading(true);
    getRecommendedPosts();
  }, []);

  const getRecommendedPosts = async () => {
    const docSnapshot = await recommendationsRef.get();

    setLoading(false);
    setAllPost(docSnapshot.docs);
  };

  const onClickPost = post => {
    navigation.navigate('MovieDetailScreen', {movieId: post?.movie?.imdbID});
  };

  const renderItem = (item, index) => {
    return (
      <PostComponent
        data={item?.data()}
        onClickPost={() => onClickPost(item?.data())}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <AppIcon style={styles.icon} width={25} height={25} />
      <FlatList
        data={allPosts}
        extraData={allPosts}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      {loading && <LoadingComponent />}
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
