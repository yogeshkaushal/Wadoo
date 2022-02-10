import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import config from '../../utils/Config';
import {screenHeight, screenWidth} from '../../utils/Helper';

const LoadingComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator
        color={config.colors.orangeColor}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  activityIndicator: {
    top: screenHeight / 2,
  },
});

export default LoadingComponent;
