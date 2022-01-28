import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../utils/Helper';

const LoadingComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator
        color="red"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  activityIndicator: {
    top: screenHeight / 2.7,
  },
});

export default LoadingComponent;
