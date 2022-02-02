import React from 'react';
import {View, Pressable, Dimensions, StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import config from '../../utils/Config';
// import NavigationIcon from './navigationIcon';
// import {SelectWheel} from '.';

const {width} = Dimensions.get('window');

const TabBarComponent = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        // if (route.name == 'PlaceholderScreen') {
        //   return (
        //     <View key={index} style={styles.mainItemContainer}>
        //       <SelectWheel />
        //     </View>
        //   );
        // }

        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              {borderRightWidth: label == 'notes' ? 3 : 0},
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? '#030D16' : '#182028',
                borderRadius: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 15,
                }}>
                {/* <NavigationIcon route={label} isFocused={isFocused} /> */}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: config.colors.tabBackground,
    borderRadius: 25,
    paddingBottom: moderateScale(30),
    // marginHorizontal: width * 0.01,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default TabBarComponent;
