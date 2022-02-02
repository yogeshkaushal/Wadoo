import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const AuthLoading = ({navigation}) => {
  const userDetails = useSelector(
    ({persistedUser}) => persistedUser?.savedUserInfo,
  );
  const onMount = () => {
    if (userDetails.userInfo?.email) {
      return navigation.reset({
        routes: [{name: 'Tabs'}],
      });
    }
    return navigation.navigate('Login');
  };
  useEffect(() => {
    onMount();
  }, []);

  return <View />;
};

export default AuthLoading;

const styles = StyleSheet.create({});
