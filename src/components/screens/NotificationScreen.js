import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import config from '../../utils/Config';
import {moderateScale} from 'react-native-size-matters';

const NotificationScreen = () => {
  const navigation = useNavigation();

  const [notifications, allNotifications] = useState([]);

  const listEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.headlineText}>No Notifications yet</Text>
      </View>
    );
  };

  const renderItem = (item, index) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner}>
        <View style={styles.upperContainer}>
          <Text style={styles.headlineText}>Notifications</Text>
        </View>
        <FlatList
          data={notifications}
          extraData={notifications}
          contentContainerStyle={[
            styles.flatList,
            {
              justifyContent:
                notifications.length === 0 ? 'center' : 'flex-start',
            },
          ]}
          ListEmptyComponent={listEmptyComponent}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
  },
  safeAreaView: {
    flex: 1,
  },
  headlineText: {
    fontFamily: config.fonts.bold,
    fontSize: moderateScale(25),
    marginBottom: moderateScale(5),
    color: 'white',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    flex: 1,
    alignItems: 'center',
  },
});

export default NotificationScreen;
