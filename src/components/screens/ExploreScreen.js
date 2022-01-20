import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../features/counter/counterSlice';

const ExploreScreen = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  function onIncrement() {
    dispatch(incrementByAmount(10));
  }

  function onDecrement() {
    dispatch(decrement());
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.conatiner} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaView: {
    flex: 1,
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
